import { aws_rds as rds, aws_ec2 as ec2, Stack, StackProps, Duration, RemovalPolicy, aws_s3 as s3 } from 'aws-cdk-lib';
import { NodejsFunctionProps, NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { randomUUID } from 'crypto';

export interface LambdaStackProps extends StackProps {
    dbInstance: rds.DatabaseInstance;
    dbProxy: rds.DatabaseProxy;
    accessRDSSecurityGroup: ec2.SecurityGroup;
    vpc: ec2.Vpc;
    databaseName: string;
    databasePort: number;
    databaseUsername: string;
}

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        // For demo setup purposes only
        this.createSetupLambda(props);

        // Create S3 bucket for task files
        const bucket = new s3.Bucket(this, 'TaskFilesBucket', {
            autoDeleteObjects: true,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        bucket.addCorsRule({
            allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.POST, s3.HttpMethods.PUT],
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
        });

        // Create lambdas
        this.createS3FileProcessorLambda(props, bucket);
        const generateS3SignedUrlFunction = this.createGenerateS3SignedUrlLambda(props, bucket);
        const getAllTasksFunction = this.createGetTasksLambda(props);
        const createTaskFunction = this.createCreateTaskLambda(props);
        const getTaskByIdFunction = this.createGetTaskByIdLambda(props);
        const updateTaskFunction = this.createUpdateTaskLambda(props);
        const deleteTaskByIdFunction = this.createDeleteTaskLambda(props);
        const createGetFileMetaByFileFunction = this.createGetFileMetaByFileLambda(props);

        // Create API gateway
        const apiGateway = new apigw.RestApi(this, `mainApiGateway`, {
            deploy: false,
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
            },
        });

        // Create DEV stage
        new apigw.Stage(this, 'dev', {
            stageName: 'dev',
            deployment: new apigw.Deployment(this, 'devStageDeployment' + randomUUID(), {
                api: apiGateway,
                retainDeployments: false,
            }),
        });

        const tasksResource = apiGateway.root.addResource('tasks');
        const tasksWithIdGatewayResource = tasksResource.addResource('{id}');

        // Add lambdas to API gateway
        const createTaskPostIntegration = new apigw.LambdaIntegration(createTaskFunction);
        tasksResource.addMethod('POST', createTaskPostIntegration);

        const updateTaskPutIntegration = new apigw.LambdaIntegration(updateTaskFunction);
        tasksWithIdGatewayResource.addMethod('PUT', updateTaskPutIntegration);

        const getTaskByIdGetIntegration = new apigw.LambdaIntegration(getTaskByIdFunction);
        tasksWithIdGatewayResource.addMethod('GET', getTaskByIdGetIntegration);

        const deleteTaskByIdGetIntegration = new apigw.LambdaIntegration(deleteTaskByIdFunction);
        tasksWithIdGatewayResource.addMethod('DELETE', deleteTaskByIdGetIntegration);

        const getAllTasksGetIntegration = new apigw.LambdaIntegration(getAllTasksFunction);
        tasksResource.addMethod('GET', getAllTasksGetIntegration);

        const filesResource = apiGateway.root.addResource('files');
        const fileSignedResource = filesResource.addResource('signed');

        const generateS3SignedUrlGetIntegration = new apigw.LambdaIntegration(generateS3SignedUrlFunction);
        fileSignedResource.addMethod('GET', generateS3SignedUrlGetIntegration);

        const generateGetFileMetaByFileGetIntegration = new apigw.LambdaIntegration(createGetFileMetaByFileFunction);
        filesResource.addMethod('GET', generateGetFileMetaByFileGetIntegration);
    }

    private lambdaDefaults(props: LambdaStackProps): NodejsFunctionProps {
        return {
            bundling: {
                externalModules: ['aws-sdk', 'pg-native'],
            },
            runtime: lambda.Runtime.NODEJS_18_X,
            timeout: Duration.seconds(30),
            handler: 'handler',
            environment: {
                DB_SECRET_ARN: props.dbInstance.secret?.secretFullArn ?? '',
                DB_ENDPOINT_ADDRESS: props.dbProxy.endpoint,
                DB_PORT: props.databasePort.toString(),
                DB_NAME: props.databaseName,
                DB_USERNAME: props.databaseUsername,
                DB_PASSWORD: '',
            },
            securityGroups: [props.accessRDSSecurityGroup],
            vpc: props.vpc,
            vpcSubnets: props.vpc.selectSubnets({
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            }),
        };
    }

    private createS3FileProcessorLambda(props: LambdaStackProps, bucket: s3.Bucket) {
        const lambda = new NodejsFunction(this, 'S3FileProcessor', {
            entry: './src/handlers/process-s3-file.ts',
            ...this.lambdaDefaults(props),
        });

        // Grant lambda access to read S3 bucket content
        bucket.grantRead(lambda);

        this.grantDefaultPermissions(props, lambda);

        // Trigger lambda on the creation of a S3 file
        lambda.addEventSource(
            new S3EventSource(bucket, {
                events: [s3.EventType.OBJECT_CREATED],
            }),
        );
    }

    private createGenerateS3SignedUrlLambda(props: LambdaStackProps, bucket: s3.Bucket): NodejsFunction {
        const options = {
            entry: './src/handlers/generate-s3-signed-url.ts',
            ...this.lambdaDefaults(props),
        };

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        options.environment!['S3_BUCKET'] = bucket.bucketName ?? '';

        const lambda = new NodejsFunction(this, 'GenerateS3SignedUrl', options);

        bucket.grantReadWrite(lambda);
        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createSetupLambda(props: LambdaStackProps) {
        const lambda = new NodejsFunction(this, 'CreateTables', {
            entry: './src/handlers/create-tables.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);
    }

    private createGetTasksLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'GetTasks', {
            entry: './src/handlers/get-tasks.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createCreateTaskLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'CreateTask', {
            entry: './src/handlers/create-task.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createGetTaskByIdLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'GetTaskById', {
            entry: './src/handlers/get-task-by-id.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createUpdateTaskLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'UpdateTask', {
            entry: './src/handlers/update-task.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createDeleteTaskLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'DeleteTask', {
            entry: './src/handlers/delete-task.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private createGetFileMetaByFileLambda(props: LambdaStackProps): NodejsFunction {
        const lambda = new NodejsFunction(this, 'GetFileMetaByFile', {
            entry: './src/handlers/get-file-meta-by-file.ts',
            ...this.lambdaDefaults(props),
        });

        this.grantDefaultPermissions(props, lambda);

        return lambda;
    }

    private grantDefaultPermissions(props: LambdaStackProps, lambda: NodejsFunction) {
        // Grant lambda access to database secret
        props.dbInstance.secret?.grantRead(lambda);

        // Allow Lambda to access RDS
        props.dbProxy.connections.allowFrom(lambda, ec2.Port.tcp(props.databasePort));
    }
}

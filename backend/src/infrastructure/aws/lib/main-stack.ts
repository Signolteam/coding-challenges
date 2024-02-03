import { aws_rds as rds, aws_ec2 as ec2, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MainStack extends Stack {
    public readonly dbInstance: rds.DatabaseInstance;
    public readonly dbProxy: rds.DatabaseProxy;
    public readonly accessRDSSecurityGroup: ec2.SecurityGroup;
    public readonly vpc: ec2.Vpc;
    public readonly databaseName = 'taskmanagement';
    public readonly databasePort = 5432;
    public readonly databaseUsername = 'postgres';

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = this.createVPC();

        const dbSecurityGroup = new ec2.SecurityGroup(this, 'DbSecurityGroup', { vpc: this.vpc });

        this.dbInstance = this.createDatabaseInstance(this.vpc, dbSecurityGroup);

        this.dbProxy = this.createDatabaseProxy(this.dbInstance, dbSecurityGroup, this.vpc);

        // Allow security group to access database instance
        this.accessRDSSecurityGroup = new ec2.SecurityGroup(this, 'AccessRDSSecurityGroup', { vpc: this.vpc });
        dbSecurityGroup.addIngressRule(this.accessRDSSecurityGroup, ec2.Port.tcp(this.databasePort));
    }

    private createVPC() {
        const vpc = new ec2.Vpc(this, 'VpcLambda', {
            maxAzs: 2,
            natGateways: 0,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'privatelambda',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                },
                // {
                //     cidrMask: 24,
                //     name: 'public',
                //     subnetType: ec2.SubnetType.PUBLIC,
                // },
            ],
        });

        // Allow access to S3 from VPC
        vpc.addGatewayEndpoint('S3Endpoint', {
            service: ec2.GatewayVpcEndpointAwsService.S3,
            subnets: [{ subnetType: ec2.SubnetType.PRIVATE_ISOLATED }],
        });

        // Allow access to  Secrets Manager from VPC
        vpc.addInterfaceEndpoint('SecretsManagerEndpoint', {
            service: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
        });

        return vpc;
    }

    private createDatabaseInstance(vpc: ec2.Vpc, dbSecurityGroup: ec2.SecurityGroup) {
        return new rds.DatabaseInstance(this, 'Instance', {
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_13,
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            vpc,
            vpcSubnets: vpc.selectSubnets({
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            }),
            databaseName: this.databaseName,
            securityGroups: [dbSecurityGroup],
            credentials: rds.Credentials.fromGeneratedSecret(this.databaseUsername),
            multiAz: false,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }

    private createDatabaseProxy(dbInstance: rds.DatabaseInstance, dbSecurityGroup: ec2.SecurityGroup, vpc: ec2.Vpc) {
        return new rds.DatabaseProxy(this, 'Proxy', {
            proxyTarget: rds.ProxyTarget.fromInstance(dbInstance),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            secrets: [dbInstance.secret!],
            securityGroups: [dbSecurityGroup],
            vpc,
            requireTLS: false,
            vpcSubnets: vpc.selectSubnets({
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            }),
        });
    }
}

import { Stack, StackProps } from 'aws-cdk-lib';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
// import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class ReactStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const reactDeploymentBucket = new Bucket(this, 'ReactDeploymentBucket', {
            accessControl: BucketAccessControl.PRIVATE,
        });

        // new BucketDeployment(this, 'BucketDeployment', {
        //     destinationBucket: reactDeploymentBucket,
        //     sources: [Source.asset('./build')],
        // });

        const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
        reactDeploymentBucket.grantRead(originAccessIdentity);

        new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(reactDeploymentBucket, { originAccessIdentity }),
            },
        });
    }
}

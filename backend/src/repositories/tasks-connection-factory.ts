import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { Pool } from 'pg';

export class TasksConnectionFactory {
    public async create(): Promise<Pool> {
        let password = process.env.DB_PASSWORD;

        if (!password) {
            // get the secret from secrets manager.
            const client = new SecretsManagerClient();
            const secret = await client.send(
                new GetSecretValueCommand({
                    SecretId: process.env.DB_SECRET_ARN,
                }),
            );

            const secretValues = JSON.parse(secret.SecretString ?? '{}');
            password = secretValues.password;
        }

        return new Pool({
            host: process.env.DB_ENDPOINT_ADDRESS,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: password,
            database: process.env.DB_NAME,
        });
    }
}

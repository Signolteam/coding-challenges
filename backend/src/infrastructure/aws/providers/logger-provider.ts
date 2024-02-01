import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({
    persistentLogAttributes: {},
});

export { logger };

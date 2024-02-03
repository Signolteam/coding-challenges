import config from './jest.config';

export default {
    ...config,
    testMatch: ['**/integration/**/*.test.ts'],
    maxWorkers: 1,
};

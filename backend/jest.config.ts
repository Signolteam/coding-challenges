process.env.LOCAL = 'true';

export default {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { parser: { decorators: true, syntax: 'typescript' } } }],
    },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^tests/(.*)$': '<rootDir>/tests/$1',
        '^mocks': '<rootDir>/tests/mocks',
        '^models': '<rootDir>/src/models',
        '^mappers': '<rootDir>/src/mappers',
        '^infrastructure/aws': '<rootDir>/src/infrastructure/aws',
        '^repositories': '<rootDir>/src/repositories',
        '^services': '<rootDir>/src/services',
        '^handlers/(.*)$': '<rootDir>/src/handlers/$1',
    },
    maxWorkers: 1,
    setupFiles: ['<rootDir>/tests/setup-env.js'],
};

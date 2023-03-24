import type { Config } from 'jest';

const jestConfig: Config = {
    testEnvironment: 'jsdom',

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },

    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    errorOnDeprecated: true,

    globals: {
        __DEV__: true,
    },

    maxConcurrency: 23,

    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],

    notify: true,
    notifyMode: 'change',

    reporters: ['default', 'github-actions'],

    showSeed: true,

    testTimeout: 10000,

    workerIdleMemoryLimit: '4GB',

    roots: ['<rootDir>/src/', '<rootDir>/__tests__/'],

    moduleNameMapper: {
        'assets/(.*)': ['<rootDir>/src/typing.d.ts'],
    },
};

export default jestConfig;

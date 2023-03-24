module.exports = {
    root: true,

    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],

    plugins: ['@jambit/typed-redux-saga'],

    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },

    env: {
        jest: true,
    },

    rules: {
        '@typescript-eslint/no-explicit-any': [
            'error',
            {
                ignoreRestArgs: true,
            },
        ],
    },

    overrides: [
        {
            files: ['./**/*.ts'],
            excludedFiles: ['./**/*.spec.ts'],
            rules: {
                '@jambit/typed-redux-saga/use-typed-effects': 'error',
                '@jambit/typed-redux-saga/delegate-effects': 'error',
            },
        },
    ],

    ignorePatterns: ['webpack.config.js', 'prettier.config.js', '.eslintrc.js', 'jest.config.ts'],
};

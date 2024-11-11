module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  root: true,
  rules: {
    'max-len': ['error', { code: 120, comments: 120 }],
    'import/extensions': 'off',
    'object-curly-newline': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
    'import/prefer-default-export': 'off',
    'max-lines-per-function': ['error', 100],
    'no-param-reassign': 'off',
  },
};

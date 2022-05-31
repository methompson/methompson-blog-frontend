module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  'settings': {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      'pragma': 'React', // Pragma to use, default to "React"
      'fragment': 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      'version': 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
    },
    'propWrapperFunctions': [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`.
      // If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { 'property': 'freeze', 'object': 'Object' },
      { 'property': 'myFavoriteWrapper' },
      // for rules that check exact prop wrappers
      { 'property': 'forbidExtraProps', 'exact': true },
    ],
    'componentWrapperFunctions': [
      // The name of any function used to wrap components, e.g. Mobx `observer` function.
      // If this isn't set, components wrapped by these functions will be skipped.
      'observer', // `property`
      { 'property': 'styled' }, // `object` is optional
      { 'property': 'observer', 'object': 'Mobx' },
      { 'property': 'observer', 'object': '<pragma>' }, // sets `object` to whatever value `settings.react.pragma` is set to
    ],
    'formComponents': [
      // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
      'CustomForm',
      { 'name': 'Form', 'formAttribute': 'endpoint' },
    ],
    'linkComponents': [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { 'name': 'Link', 'linkAttribute': 'to' },
    ],
  },
  rules: {
    semi: 'off',
    eqeqeq: ['error'],
    'no-trailing-spaces': ['error', {}],
    'no-multi-spaces': 'error',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    quotes: ['error', 'single'],
    'no-restricted-syntax': 0,
    'class-methods-use-this': 'off',
    'no-continue': 'off',
    'no-plusplus': 'off',
    'max-len': [
      1,
      {
        ignoreStrings: true,
        code: 120,
        comments: 120,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    'no-trailing-spaces': 'error',
    'brace-style': ['error', '1tbs'],
    indent: 'off',
    'no-unused-vars': 'off',
    'no-empty-function': 'off',
    'max-classes-per-file': 'off',
    strict: 'off',
    camelcase: 'off',
    'no-console': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: false,
      },
    ],
    'object-curly-newline': ['error', { ObjectPattern: { consistent: true } }],
    'comma-dangle': ['error', 'always-multiline'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/ban-types': ['error'],
  },
};

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
  overrides: [
    {
      files: ['src/**/index.js'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}

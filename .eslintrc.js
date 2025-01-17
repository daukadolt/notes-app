module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 4],
  },
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['off', 2],
    'generator-star-spacing': 'off',
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'no-trailing-spaces': 0,
    'camelcase': [0, {properties: 'always'}],
    'no-useless-return': 'off'
  }
}

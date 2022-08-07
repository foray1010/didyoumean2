'use strict'

module.exports = {
  plugins: ['eslint-plugin-functional'],
  extends: ['@foray1010/eslint-config'],
  rules: {
    'functional/prefer-readonly-type': [
      'error',
      {
        allowLocalMutation: true,
        ignoreClass: 'fieldsOnly',
      },
    ],
  },
}

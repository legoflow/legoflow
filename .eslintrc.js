'use strict'

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard'
  ],
  globals: {
    __config: true,
    __messager: true,
    __util: true,
    __workflowDevPid: true,
    __workflowBuildPid: true
  },
  rules: {
    'eqeqeq': 'off'
  }
}

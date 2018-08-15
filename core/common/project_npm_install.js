'use strict'

const shell = require('shelljs')

module.exports = function (projectPath) {
  const npm = require('../../npm/lib/npm')

  shell.cd(projectPath)

  return new Promise((resolve, reject) => {
    npm.load(() => {
      npm.install((e) => {
        if (e) {
          reject(e)
        } else {
          resolve()
        }
      })
    })
  })
}

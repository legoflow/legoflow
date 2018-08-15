'use strict'

const path = require('path')
const updater = require('electron-cover-updater')

const { lab, root, version } = __config

const isPOP = lab ? 'preview' : 'publish'

updater.config({
  root,
  versionURL: 'https://legoflow.com/2.0/version.json',
  versionField: isPOP,
  zipURL: `https://legoflow.com/2.0/${isPOP}`,
  isDiffSystem: false,
  packageJsonFile: path.resolve(root, './package.json'),
  nowVersion: version
})

exports.check = () => {
  return updater.check()
}

exports.update = updater.update
exports.updating = updater.updating

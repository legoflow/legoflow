'use strict'

const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')
const del = require('del')

const root = path.resolve(__dirname, '../')
const dist = path.resolve(root, './dist')

const { version } = require(`${root}/package.json`)

const app = 'LegoFlow 2-win32-x64'
const appPath = path.resolve(dist, `./${app}`)
const newApp = 'LegoFlow 2'
const newAppPath = path.resolve(dist, `./${newApp}`)
const zip = `LegoFlow-2-Windows-64-${version}.rar`
const zipPath = path.resolve(dist, `./${zip}`)

if (!fs.existsSync(appPath)) {
  console.error('app undefined')

  return void 0
}

console.log('del...')

del.sync([ newAppPath, zipPath ], { force: true })

console.log('del ok')

console.log('copy...')

fs.copySync(appPath, newAppPath, { overwrite: true })

console.log('copy ok')

shell.cd(dist)

console.log('packing...')

if (shell.exec(`"C:/Program Files/WinRAR/Rar.exe"  a -k -r -s -ibck "${zip}"  "${newApp}"`).code === 0) {
  console.log('OK')
}

'use strict'

const del = require('del')
const fs = require('fs-extra')
const path = require('path')

const nodeSassPath = path.resolve(__dirname, '../node_modules/node-sass')

del.sync(nodeSassPath)
fs.copySync(path.resolve(__dirname, '../__node-sass__/node-sass'), nodeSassPath, { overwrite: true })

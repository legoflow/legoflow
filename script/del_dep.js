'use strict'

const del = require('del')
const path = require('path')

del.sync(path.resolve(__dirname, '../node_modules'), { force: true })
del.sync(path.resolve(__dirname, '../package-lock.json'), { force: true })

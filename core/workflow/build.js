'use strict'

require('./messager')

const build = require('legoflow-engine/build')
const messager = require('legoflow-engine/messager')

process.on('message', build)

process.on('uncaughtException', (err) => {
  console.error('[BUILD@UNCAUGHT EXCEPTION]', err)

  messager({ type: 'error', msg: err })
})

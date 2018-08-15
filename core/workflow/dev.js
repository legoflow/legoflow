'use strict'

require('./messager')

const dev = require('legoflow-engine/dev')
const messager = require('legoflow-engine/messager')

process.on('message', dev)

process.on('uncaughtException', (err) => {
  console.error('[DEV@UNCAUGHT EXCEPTION]', err)

  messager({ type: 'error', msg: err })
})

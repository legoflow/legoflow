'use strict'

const ps = require('ps-node')
const path = require('path')
const { fork } = require('child_process')

const ipcWorkflowFactory = require('../common/ipc_workflow_factory')

/* eslint-disable no-unused-vars */
let app, mainWindow

module.exports = (_app, _mainWindow) => {
  /* eslint-disable no-unused-expressions */
  /* eslint-disable no-sequences */
  app = _app, mainWindow = _mainWindow
  ipcWorkflowFactory.setMainWindow(_mainWindow)
}

global.__workflowBuildPid = { }

// 停止指定构建进程
const killer = (id) => {
  if (typeof __workflowBuildPid[ id ] === 'undefined') {
    return void 0
  }

  return new Promise((resolve, reject) => {
    ps.kill(__workflowBuildPid[ id ], (err) => {
      if (err) {
        reject(err)
      } else {
        delete __workflowBuildPid[ id ]
        resolve()
      }
    })
  })
}

// 启动构建工作流
ipcWorkflowFactory('WORKFLOW_BUILD_RUN', (event, config) => {
  const { id } = config

  config.workflow = 'build'
  config.from = 'app'

  const thread = fork(path.resolve(__dirname, '../workflow/build'))

  __workflowBuildPid[ id ] = thread.pid

  config.pid = thread.pid

  thread.send(config)

  let messager = void 0

  event.sender.send('WORKFLOW_BUILD_RUN_SUCCESS', config)

  const SUCCESS_EXEC = (data, logger) => {
    logger('构建完成')

    event.sender.send('WORKFLOW_BUILD_STOP_SUCCESS', config)
  }

  const STOP_EXEC = (msg) => {
    killer(id)

    messager && messager({ type: 'error', msg })

    event.sender.send('WORKFLOW_BUILD_STOP_SUCCESS', config)
  }

  messager = __messager._workflow_adapter_(config, SUCCESS_EXEC, STOP_EXEC)

  messager({ type: 'log', msg: '构建中，请稍候...' })

  thread.on('message', messager)
})

// 关闭构建工作流
ipcWorkflowFactory('WORKFLOW_BUILD_STOP', (event, config) => {
  config.pid = __workflowBuildPid[ config.id ]

  config.workflow = 'buildStop'

  const messager = __messager._workflow_adapter_(config)

  event.sender.send('WORKFLOW_BUILD_STOP_SUCCESS', config)

  const result = killer(config.id)

  // TODO: 中间态
  // const FAIL_EXEC = ( ) => {
  //     __messager.event( '停止构建工作流失败' );
  // }

  // if ( !result ) {
  //     FAIL_EXEC( ); return void 0;
  // }

  // result.then( ( ) => {
  //         event.sender.send( 'WORKFLOW_BUILD_STOP_SUCCESS', config );
  //     } )
  //     .catch( ( e ) => {
  //         FAIL_EXEC( );
  //     } )
})

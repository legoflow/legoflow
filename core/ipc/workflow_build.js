'use strict';

const ipcWorkflowFactory = require('../common/ipc_workflow_factory');

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

// 启动构建工作流
ipcWorkflowFactory( 'WORKFLOW_BUILD_RUN', ( event, config ) => {
    event.sender.send( 'WORKFLOW_BUILD_RUN_SUCCESS', config );

    setTimeout( ( ) => {
        event.sender.send( 'WORKFLOW_BUILD_STOP_SUCCESS', config );
    }, 5000 )
} )

// 关闭构建工作流
ipcWorkflowFactory( 'WORKFLOW_BUILD_STOP', ( event, config ) => {
    event.sender.send( 'WORKFLOW_BUILD_STOP_SUCCESS', config );
} )

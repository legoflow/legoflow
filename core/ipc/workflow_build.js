'use strict';

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

const electron = require('electron');

const ipc = electron.ipcMain;

// 启动开发工作流
ipc.on( 'WORKFLOW_BUILD_RUN', ( event, data ) => {

} )

// 关闭开发工作流
ipc.on( 'WORKFLOW_BUILD_STOP', ( event, data ) => {

} )

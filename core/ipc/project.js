'use strict';

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

const electron = require('electron');

const ipc = electron.ipcMain;

// 新建项目
ipc.on( 'PROJECT_NEW', async ( event, data ) => {
    const error = await require('../common/project_new')( data );

    !error ? event.sender.send( 'PROJECT_NEW_SUCCESS', data ) : __messager.event( error );
} );

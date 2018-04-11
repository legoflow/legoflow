'use strict';

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

const electron = require('electron');

const ipc = electron.ipcMain;

// 新建项目
ipc.on( 'PROJECT_NEW', async ( event, data ) => {
    const result = await require('../common/project_new')( data );

    typeof result !== 'string'  ? event.sender.send( 'PROJECT_NEW_SUCCESS', result ) : __messager.event( result );
} );

// 增加项目
ipc.on( 'PROJECT_ADD', async ( event, data ) => {
    const result = await require('../common/project_add')( data );

    typeof result !== 'string'  ? event.sender.send( 'PROJECT_ADD_SUCCESS', result ) : __messager.event( result );
} );

// 更新项目信息
ipc.on( 'PROJECT_UPDATE', ( event, data ) => {
    const { id, name, path } = data;

    const config = path.getConfig( data );

    if ( !config ) {
        __messager.event( '找不到配置文件' );

        return void 0;
    }

    mainWindow.webContents.send( 'PROJECT_UPDATE', config );
} )

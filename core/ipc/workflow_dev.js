'use strict';

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

const electron = require('electron');

const ipc = electron.ipcMain;

global.__workflowDevPid = { };

let canUserPortForWebpack = __config.env === 'dev' ? 5680 : 5580;

// 注册
const register = ( { id } ) => {
    let port = void 0;

	for ( let key in __workflowDevPid ) {
		if ( __workflowDevPid[ key ] === '' ) {
			port = key;
		}
    }

	if ( !port ) {
        canUserPortForWebpack = canUserPortForWebpack + 1;

        __workflowDevPid[ canUserPortForWebpack ] = { id, pid: void 0 };

		port = canUserPortForWebpack;
    }

	return port;
}

// 启动开发工作流
ipc.on( 'WORKFLOW_DEV_RUN', ( event, data ) => {
    const webpackPort = register( data );

    const { id, name, path } = data;

    let config = path.getConfig( );

    if ( !config ) {
        __messager.event( '找不到配置文件' );

        return void 0;
    }

    config = Object.assign( config, __config );

    console.log( config );

    event.sender.send( 'WORKFLOW_DEV_RUN_SUCCESS', config );
} )

// 关闭开发工作流
ipc.on( 'WORKFLOW_DEV_STOP', ( event, data ) => {

} )

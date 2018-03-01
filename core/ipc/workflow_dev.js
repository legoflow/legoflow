'use strict';

const ipcWorkflowFactory = require('../common/ipc_workflow_factory');

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

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
ipcWorkflowFactory( 'WORKFLOW_DEV_RUN', ( event, config ) => {
    const webpackPort = register( config );

    // console.log( config );

    event.sender.send( 'WORKFLOW_DEV_RUN_LAUNCH', config );

    setTimeout( ( ) => {
        event.sender.send( 'WORKFLOW_DEV_RUN_SUCCESS', config );
    }, 5000 )
} );


// 关闭开发工作流
ipcWorkflowFactory( 'WORKFLOW_DEV_STOP', ( event, config ) => {
    event.sender.send( 'WORKFLOW_DEV_STOP_SUCCESS', config );
} )

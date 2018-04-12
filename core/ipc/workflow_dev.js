'use strict';

const ps = require('ps-node');
const path = require('path');
const { fork } = require('child_process');

const ipcWorkflowFactory = require('../common/ipc_workflow_factory');

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => {
    app = _app, mainWindow = _mainWindow;
    ipcWorkflowFactory.setMainWindow( _mainWindow );
}

global.__workflowDevPid = { };

let canUserPortForWebpack = __config.env === 'dev' ? __config.webpack.originPortDev : __config.webpack.originPort;

// 注册
const register = ( { id } ) => {
    let port = void 0;

	for ( let key in __workflowDevPid ) {
		if ( __workflowDevPid[ key ] === '' ) {
            port = key;

            __workflowDevPid[ key ] = { id, pid: void 0 };
		}
    }

	if ( !port ) {
        canUserPortForWebpack = canUserPortForWebpack + 1;

        __workflowDevPid[ canUserPortForWebpack ] = { id, pid: void 0 };

		port = canUserPortForWebpack;
    }

	return port;
}

// 停止指定开发进程
const killer = ( id ) => {
    let pid = void 0;
    let key = void 0;

    for ( let _key_ in __workflowDevPid ) {
         if ( __workflowDevPid[ _key_ ].id === id ) {
            pid = __workflowDevPid[ _key_ ].pid;
            key = _key_;
         }
    }

    if ( typeof pid === 'undefined' ) {
        return void 0;
    }

    return new Promise( ( resolve, reject ) => {
        ps.kill( pid, ( e ) => {
            if ( e ) {
                reject( );
            }
            else {
                __workflowDevPid[ key ] = '';
                resolve( );
            }
        } );
    } );
}

// 启动开发工作流
ipcWorkflowFactory( 'WORKFLOW_DEV_RUN', ( event, config ) => {
    const webpackPort = register( config );

    config.webpackPort = webpackPort;
    config.workflow = 'dev';

    event.sender.send( 'WORKFLOW_DEV_RUN_LAUNCH', config );

    const thread = fork( path.resolve( __dirname, '../workflow/dev' ) );

    __workflowDevPid[ webpackPort ].pid = thread.pid;

    thread.send( config );

    let messager = void 0;

    const SUCCESS_EXEC = ( data, logger ) => {
        event.sender.send( 'WORKFLOW_DEV_RUN_SUCCESS', data );
    }

    const STOP_EXEC = ( msg ) => {
        killer( config.id );

        messager ? messager( { type: 'error', msg } ) : void 0;

        event.sender.send( 'WORKFLOW_DEV_STOP_SUCCESS', config );
    }

    messager = __messager._workflow_adapter_( config, SUCCESS_EXEC, STOP_EXEC );

    messager( { type: 'log', msg: '启动中，请稍候...' } );

    thread.on( 'message', messager );
} );


// 关闭开发工作流
ipcWorkflowFactory( 'WORKFLOW_DEV_STOP', ( event, config ) => {
    const result = killer( config.id );

    const FAIL_EXEC = ( ) => {
        __messager.event( '停止开发工作流失败' );
    }

    if ( !result ) {
        FAIL_EXEC( ); return void 0;
    }

    event.sender.send( 'WORKFLOW_DEV_STOP_SUCCESS', config );

    // TODO: 中间态
    // result.then( ( ) => {
    //         //
    //     } )
    //     .catch( ( e ) => {
    //         FAIL_EXEC( );
    //     } )
} )

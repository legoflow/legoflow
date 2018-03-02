'use strict';

const ps = require('ps-node');
const path = require('path');
const { fork } = require('child_process');

const ipcWorkflowFactory = require('../common/ipc_workflow_factory');

let app, mainWindow;

module.exports = ( _app, _mainWindow ) => { app = _app, mainWindow = _mainWindow; }

global.__workflowBuildPid = { };

// 停止指定构建进程
const killer = ( id ) => {
    if ( typeof __workflowBuildPid[ id ] === 'undefined' ) {
        return void 0;
    }

    return new Promise( ( resolve, reject ) => {
        ps.kill( __workflowBuildPid[ id ], ( err ) => {
            if ( err ) {
                reject( );
            }
            else {
                delete __workflowBuildPid[ id ];
                resolve( );
            }
        } );
    } );
}

// 启动构建工作流
ipcWorkflowFactory( 'WORKFLOW_BUILD_RUN', ( event, config ) => {
    const { id } = config.id;

    const thread = fork( path.resolve( __dirname, '../workflow/build' ) );

    __workflowDevPid[ id ] = thread.pid;

    thread.send( config );

    let messager = void 0;

    const SUCCESS_EXEC = ( ) => {
        event.sender.send( 'WORKFLOW_BUILD_RUN_SUCCESS', config );
    }

    const STOP_EXEC = ( { msg } ) => {
        messager ? messager( { type: 'error', msg } ) : void 0;

        event.sender.send( 'WORKFLOW_BUILD_STOP_SUCCESS', config );
    }

    messager = __messager._workflow_adapter_( config, SUCCESS_EXEC, STOP_EXEC );

    thread.on( 'message', messager );
} )

// 关闭构建工作流
ipcWorkflowFactory( 'WORKFLOW_BUILD_STOP', ( event, config ) => {
    const result = killer( config.id );

    const FAIL_EXEC = ( ) => {
        __messager.event( '停止构建工作流失败' );
    }

    if ( !result ) {
        FAIL_EXEC( ); return void 0;
    }

    result.then( ( ) => {
            event.sender.send( 'WORKFLOW_BUILD_STOP_SUCCESS', config );
        } )
        .catch( ( e ) => {
            FAIL_EXEC( );
        } )
} )

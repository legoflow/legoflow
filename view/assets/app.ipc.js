'use strict';

const ipcRenderer = require('electron').ipcRenderer;

window.ipcRenderer = ipcRenderer;

window.ipc = {
    app: {
        restart ( ) { ipcRenderer.send( 'APP_RESTART' ) },
        checkUpdate ( isAuto ) { ipcRenderer.send( 'APP_CHECK_UPDATE', isAuto ) },
        update ( )  { ipcRenderer.send( 'UPDATE' ) },
    },
    mainWindow: {
        min ( ) { ipcRenderer.send( 'MAIN_WINDOW_MIN' ) },
        show ( ) { ipcRenderer.send( 'MAIN_WINDOW_SHOW' ) },
        hide ( ) { ipcRenderer.send( 'MAIN_WINDOW_HIDE' ) },
        openDevTools ( ) { ipcRenderer.send( 'MAIN_WINDOW_OPEN_DEV_TOOLS' ) },
    },
    settingWindow: {
        hide ( ) { ipcRenderer.send( 'SETTING_WINDOW_HIDE' ) },
        show ( ) { ipcRenderer.send( 'SETTING_WINDOW_SHOW' ) },
    },
    updateConfig ( config ) { ipcRenderer.send( 'UPDATE_CONFIG', config ) },
    project: {
        new ( data ) { ipcRenderer.send( 'PROJECT_NEW', data ) },
        add ( data ) { ipcRenderer.send( 'PROJECT_ADD', data ) },
        update ( data ) { ipcRenderer.send( 'PROJECT_UPDATE', data ) },
    },
    workflow: {
        dev: {
            run ( data ) { ipcRenderer.send( 'WORKFLOW_DEV_RUN', data ) },
            stop ( data ) { ipcRenderer.send( 'WORKFLOW_DEV_STOP', data ) },
        },
        build: {
            run ( data ) { ipcRenderer.send( 'WORKFLOW_BUILD_RUN', data ) },
            stop ( data ) { ipcRenderer.send( 'WORKFLOW_BUILD_STOP', data ) },
        },
    },
    util: {
        chromeOpen ( url ) {
            if (
                url.indexOf( 'http://' ) == 0 ||
                url.indexOf( 'https://' ) == 0
            ) {
                ipcRenderer.send( 'UTIL_CHROME_OPEN', url );
            }
        },
    },
}

// update
ipcRenderer.on( 'CAN_UPDATE', ( event, data ) => {
    window.vm && window.vm.updateAlert( data );
} )

ipcRenderer.on( 'UPDATE', ( event, data ) => {
    window.vm && window.vm.update( data );
} )

// messager
ipcRenderer.on( 'MESSAGER', ( event, data ) => {
    window.vm && window.vm.messager( data );
} )

// 新建项目成功
ipcRenderer.on( 'PROJECT_NEW_SUCCESS', ( event, data ) => {
    window.vm && window.vm.projectNewAndAdd( 'new', data );
} )

ipcRenderer.on( 'PROJECT_ADD_SUCCESS', ( event, data ) => {
    window.vm && window.vm.projectNewAndAdd( 'add', data );
} )

ipcRenderer.on( 'PROJECT_UPDATE', ( event, data ) => {
    window.vm && window.vm.projectUpdate( data );
} )

// 开发工作流启动中
ipcRenderer.on( 'WORKFLOW_DEV_RUN_LAUNCH', ( event, data ) => {
    window.vm.projectWorkflow( { type: 'dev', state: 'launch', data, } );
} )

// 开发工作流启动成功
ipcRenderer.on( 'WORKFLOW_DEV_RUN_SUCCESS', ( event, data ) => {
    window.vm.projectWorkflow( { type: 'dev', state: 'run', data, } );
} )

// 停止开发工作流
ipcRenderer.on( 'WORKFLOW_DEV_STOP_SUCCESS', ( event, data ) => {
    window.vm.projectWorkflow( { type: 'dev', state: 'stop', data, } );
} )

// 构建工作流运行中
ipcRenderer.on( 'WORKFLOW_BUILD_RUN_SUCCESS', ( event, data ) => {
    window.vm.projectWorkflow( { type: 'build', state: 'run', data, } );
} )

// 停止开发工作流
ipcRenderer.on( 'WORKFLOW_BUILD_STOP_SUCCESS', ( event, data ) => {
    window.vm.projectWorkflow( { type: 'build', state: 'stop', data, } );
} )


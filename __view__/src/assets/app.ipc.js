'use strict';

const ipcRenderer = require('electron').ipcRenderer;

window.ipcRenderer = ipcRenderer;

window.ipc = {
    app: {
        restart ( ) {
            ipcRenderer.send( 'APP_RESTART' );
        },
    },
    mainWindow: {
        min ( ) {
            ipcRenderer.send( 'MAIN_WINDOW_MIN' );
        },
        show ( ) {
            ipcRenderer.send( 'MAIN_WINDOW_SHOW' );
        },
        hide ( ) {
            ipcRenderer.send( 'MAIN_WINDOW_HIDE' );
        },
    },
    settingWindow: {
        hide ( ) {
            ipcRenderer.send( 'SETTING_WINDOW_HIDE' );
        },
        show ( ) {
            ipcRenderer.send( 'SETTING_WINDOW_SHOW' );
        },
    },
    updateConfig ( ) {
        ipcRenderer.send( 'UPDATE_CONFIG' );
    },
    project: {
        new ( data ) {
            ipcRenderer.send( 'PROJECT_NEW', data );
        },
    },
}

ipcRenderer.on( 'MESSAGER', ( event, data ) => {
    window.vm && window.vm.messager( data );
} )

// 新建项目成功
ipcRenderer.on( 'PROJECT_NEW_SUCCESS', ( event, data ) => {
    window.vm && window.vm.projectNewSuccess( data );
} )

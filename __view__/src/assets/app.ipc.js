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
            ipcRenderer.send( 'MIAN_WINDOW_MIN' );
        },
        show ( ) {
            ipcRenderer.send( 'MIAN_WINDOW_SHOW' );
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
}

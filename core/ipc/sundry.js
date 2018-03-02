'use strict';

const webSetting = require('../common/web_setting');
const threadKiller = require('../common/thread_killer');

let app, mainWindow, settingWindow;

module.exports = ( _app, _mainWindow, _settingWindow ) => {
    app = _app, mainWindow = _mainWindow; settingWindow = _settingWindow;
}

const electron = require('electron');

const ipc = electron.ipcMain;

// 应用重启
ipc.on( 'APP_RESTART', ( event ) => {
    threadKiller( );

    app.relaunch( );
    app.exit( 0 );
} )

// 停止全部工作流进程
ipc.on( 'THREAD_KILL', ( event ) => {
    threadKiller( );
} )

// 最小化应用窗口
ipc.on( 'MAIN_WINDOW_MIN', ( ) => mainWindow.minimize( ) );

// 显示应用窗口
ipc.on( 'MAIN_WINDOW_SHOW', ( ) => mainWindow.show( ) );

// 隐藏应用窗口
ipc.on( 'MAIN_WINDOW_HIDE', ( ) => mainWindow.hide( ) );

// 隐藏设置窗口
ipc.on( 'SETTING_WINDOW_HIDE', ( ) => settingWindow.hide( ) );

// 显示设置窗口
ipc.on( 'SETTING_WINDOW_SHOW', ( ) => settingWindow.show( ) );

// 更新配置
ipc.on( 'UPDATE_CONFIG', async ( event ) => {
    await webSetting.updateConfig( );
} );

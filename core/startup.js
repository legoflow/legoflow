'use strict';

const { BrowserWindow } = require('electron');
const path = require('path');

const threadKiller = require('./common/thread_killer');
const webSetting = require('./common/web_setting');

let mainWindow = void 0;
let settingWindow = void 0;

require('./clean')( );

module.exports = ( app ) => {
    global.__util = require('./common/util');
    global.__notifier = require('./common/notifier');

    const { config } = require('../package.json');

    global.__config = Object.assign( {
        version: app.getVersion( ),
        root: app.getAppPath( ).pathNorm( ),
        system: process.platform == 'win32' ? 'win' : 'mac',
        env: process.argv[ 2 ] || 'build',
    }, config );

    threadKiller( );

    return async ( ) => {
        const { system, env, root } = __config;

        let option = {
            resizable: false,
            fullscreen: false,
            show: false,
        }

        switch ( system ) {
            case 'win': {
                option.width = 305;
                option.height = 502;
                break;
            }
            case 'mac': {
                option.frame = false;
                option.autoHideMenuBar = true,
                option.width = 280;
                option.height = 480;
                break;
            }
        }

        if ( env === 'dev' ) {
            option.show = true;
            option.width  = 800;
            option.height = 480;
        }

        mainWindow = new BrowserWindow( option );

        const viewFolder = path.resolve( __dirname, '../view' );

        env === 'dev' ? mainWindow.loadURL( 'http://localhost:3000' ) : mainWindow.loadURL( `file://${ viewFolder }/index.html` );

        env === 'dev' ? mainWindow.webContents.openDevTools( { mode: 'right' } ) : void 0;

        webSetting( mainWindow );

        await webSetting.updateConfig( );

        global.__messager = require('./common/messager')( mainWindow );

        if ( env === 'dev' ) {
            mainWindow.loadURL( 'http://localhost:3000/#/app' );
        }
        else {
            mainWindow.webContents.executeJavaScript( 'location.href = `${ location.href }app`' );
        }

        mainWindow.setMenu( null );

        mainWindow.on( 'closed', app.quit );

        // render setting window
        settingWindow = new BrowserWindow( {
            width: 300,
            height: 430,
            resizable: false,
            fullscreen: false,
            fullscreenable: false,
            maximizable: false,
            center: true,
            show: false,
        } );

        settingWindow.setMenu( null );

        if ( env === 'dev' ) {
            settingWindow.loadURL( 'http://localhost:3000/#/setting' );
        }
        else {
            settingWindow.loadURL( `file://${ viewFolder }/index.html` );

            settingWindow.webContents.executeJavaScript( 'location.href = `${ location.href }setting`' );
        }

        app.on( 'before-quit', ( ) => settingWindow.webContents.send( 'APP_QUIT' ) );

        // to create tray
        require('./tray')( mainWindow );

        // render IPC
        require('./ipc')( app, mainWindow, settingWindow );
    };
};

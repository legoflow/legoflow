'use strict';

const { BrowserWindow } = require('electron');

const webSetting = require('./common/web_setting');

let mainWindow = void 0;
let settingWindow = void 0;

module.exports = ( app ) => {
    global.__util = require('./common/util');

    const { config } = require('../package.json');

    global.__config = Object.assign( {
        version: app.getVersion( ),
        root: app.getAppPath( ).pathNorm( ),
        system: process.platform == 'win32' ? 'win' : 'mac',
        env: process.argv[ 2 ] || 'build',
    }, config );

    return async ( ) => {
        const { system, debug, root } = __config;

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
                option.width = 290;
                option.height = 480;
                break;
            }
        }

        if ( debug ) {
            option.width  = 800;
            option.height = 480;
        }

        mainWindow = new BrowserWindow( option );

        debug ? mainWindow.loadURL( 'http://localhost:3000' ) : mainWindow.loadURL( `file://${ root }/view/index.html` );

        webSetting( mainWindow );

        await webSetting.updateConfig( );

        global.__messager = require('./common/messager')( mainWindow );

        debug ? mainWindow.loadURL( 'http://localhost:3000/#/app' ) : mainWindow.loadURL( `file://${ root }/view/index.html/#/app` );

        debug ? mainWindow.webContents.openDevTools({ mode: 'right' }) : void 0;

        mainWindow.setMenu( null );

        mainWindow.on( 'closed', app.quit );

        // render setting window
        settingWindow = new BrowserWindow( {
            width: 300,
            height: 400,
            resizable: false,
            fullscreen: false,
            fullscreenable: false,
            maximizable: false,
            center: true,
            show: false,
        } );

        settingWindow.setMenu( null );

        debug ? settingWindow.loadURL( 'http://localhost:3000/#/setting' ) : settingWindow.loadURL( `file://${ root }/view/index.html/#/setting` );

        app.on( 'before-quit', ( ) => settingWindow.webContents.send( 'APP_QUIT' ) );

        // to create tray
        require('./tray')( mainWindow );

        // render IPC
        require('./ipc')( app, mainWindow, settingWindow );
    };
};



'use strict';

const { BrowserWindow } = require('electron');

let mainWindow = void 0;

module.exports = ( app ) => {
    global.__util = require('./lib/util');

    const { config } = require('../package.json');

    global.__config = Object.assign( {
        version: app.getVersion( ),
        root: app.getAppPath( ).pathNorm( ),
        system: process.platform == 'win32' ? 'win' : 'mac',
        env: process.argv[ 2 ] || 'build',
        user: '',
    }, config );

    return ( ) => {
        const { system, debug, root } = __config;

        let option = {
            resizable : false,
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
            option.show = true;
        }

        mainWindow = new BrowserWindow( option );

        global.__logger = require('./lib/logger')( mainWindow );

        debug ? mainWindow.loadURL('http://localhost:3000') : mainWindow.loadURL(`file://${ root }/view/index.html`);

        debug ? mainWindow.webContents.openDevTools({ mode: 'right' }) : void 0;

        mainWindow.setMenu( null );

        mainWindow.on( 'closed', app.quit );

        // to create tray
        require('./tray')( mainWindow );

        // render IPC
        require('./ipc')( app, mainWindow );
    };
};

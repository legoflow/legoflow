'use strict';

const fs = require('fs');

let tray = void 0;

module.exports = ( mainWindow ) => {
    const { root, system } = __config;

    if ( !system !== 'mac' ) {
        return void 0;
    }

    const trayIcon = `${ __app.root }/icon/logo-tray.png`;

    tray = new Tray( trayIcon );

    tray.setToolTip( 'LegoFlow' );

    tray.on( 'click', mainWindow.show );

    tray.on( 'drop-files', ( event, path ) => {
        event.preventDefault( );

        mainWindow.show( );

        // TODO: 通知 view
    })
};

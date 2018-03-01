'use strict';

const electron = require('electron');

const ipc = electron.ipcMain;

module.exports = function ( key, main ) {
    ipc.on( key, ( event, data ) => {
        const { id, name, path } = data;

        const config = path.getConfig( data );

        if ( !config ) {
            __messager.event( '找不到配置文件' );

            return void 0;
        }

        main( event, config );
    } );
};

'use strict';

module.exports = ( mainWindow ) => {
    const messager = { };

    const sender = ( type, data ) => {
        // send to view
        mainWindow.webContents.send( 'MESSAGER', { type, data });

        console[ console[ type ] ? type : 'log' ]( `[MESSAGER ${  type.toUpperCase( ) }]:`, data );
    }

    messager.info = data => sender( 'info', data );

    messager.error = data => sender( 'error', data );

    messager.event = data => sender( 'event', data );

    return messager;
};


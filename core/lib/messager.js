'use strict';

module.exports = ( mainWindow ) => {
    const messager = { };

    const sender = ( type, msg ) => {
        // send to view
        mainWindow.webContents.send( 'messager', { type, msg, });

        console[ console[ type ] ? type : 'log' ]( `[logger ${ type }]: `, msg );
    }

    messager.info = msg => sender( 'info', msg );

    messager.error = msg => sender( 'error', msg );

    messager.event = msg => sender( 'event', msg );

    return messager;
};


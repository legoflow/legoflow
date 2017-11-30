'use strict';

module.exports = ( mainWindow ) => {
    const logger = { };

    const messager = ( type, msg ) => {
        // send to view
        mainWindow.webContents.send( 'messager', { type, msg, });

        console[ console[ type ] ? type : 'log' ]( `[logger ${ type }]: `, msg );
    }

    logger.info = msg => messager( 'info', msg );

    logger.error = msg => messager( 'error', msg );

    logger.event = msg => messager( 'event', msg );

    return logger;
};


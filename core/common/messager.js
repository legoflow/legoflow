'use strict';

const _ = require('lodash');

module.exports = ( mainWindow ) => {
    const messager = { };

    const sender = ( type, data ) => {
        // send to view
        mainWindow.webContents.send( 'MESSAGER', { type, data });

        console[ console[ type ] ? type : 'log' ]( `[MESSAGER ${  type.toUpperCase( ) }]:`, data );
    }

    messager.log = data => sender( 'info', data );

    messager.event = data => sender( 'event', data );

    messager._workflow_adapter_ = ( config, success, stop ) => {
        return ( data ) => {
            const { type, msg } = data;

            let newData = _.cloneDeep( data );

            newData.type = `workflow_${ type }`;
            newData.config = config;

            switch ( type ) {
                case 'info': { messager.log( newData ); break; }
                case 'error': { messager.log( newData ); break; }
                case 'success': { success( data ); break; }
                case 'stop': { stop( data ); break; }
                case 'notice': { __notifier( msg ); break; }
            }
        };
    }

    return messager;
};


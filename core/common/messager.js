'use strict';

const chalk = require('chalk');
const _ = require('lodash');

module.exports = ( mainWindow ) => {
    const messager = { };

    const sender = ( type, data ) => {
        // send to view
        mainWindow.webContents.send( 'MESSAGER', { type, data } );

        let workflowMsg = void 0;

        if ( data && data.type && data.type.indexOf( 'workflow_' ) === 0 ) {
            workflowMsg = data.msg;
        }

        console[ console[ type ] ? type : 'log' ]( `[MESSAGER@${ type.toUpperCase( ) }]:`, workflowMsg || data );
    }

    messager.log = data => sender( 'log', data );

    messager.event = data => sender( 'event', data );

    messager._workflow_adapter_ = ( config, success, stop ) => {
        return ( data ) => {
            const { type, msg, log } = data;

            let newData = _.cloneDeep( data );

            newData.type = `workflow_${ config.workflow }_${ type }`;
            newData.config = config;

            switch ( type ) {
                case 'log': { messager.log( newData ); break; }
                case 'error': { messager.log( newData ); break; }
                case 'success': {
                    success( msg, ( _msg_ ) => {
                        messager.log( { type: `workflow_${ config.workflow }_success`, config, msg: _msg_ } );
                    } );
                    break;
                }
                case 'stop': { stop( msg ); break; }
                case 'notice': { __notifier( msg ); break; }
            }
        };
    }

    return messager;
};


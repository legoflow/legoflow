'use strict';

const Messager = require('legoflow-engine/messager');

Messager.sender = function ( { type, msg } ) {
    if ( typeof msg === 'object' ) {
        JSON.stringify( msg ) == '{}' ? msg = msg.toString( ) : msg = JSON.stringify( msg );
    }

    process.send( { type, msg } );
}

Messager.setConfig = function ( config ) {
    process.send( { type: 'update-config', config } );
}

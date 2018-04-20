'use strict';

const { messager } = require('legoflow-engine');

messager.sender = function ( { type, msg } ) {
    if ( typeof msg === 'object' ) {
        JSON.stringify( msg ) == '{}' ? msg = msg.toString( ) : msg = JSON.stringify( msg );
    }

    process.send( { type, msg } );
}

'use strict';

const sender = ( { type, msg } ) => {
    if ( typeof msg === 'object' ) {
        JSON.stringify( msg ) == '{}' ? msg = msg.toString( ) : msg = JSON.stringify( msg );
    }

    process.send( { type, msg } );
}

module.exports = {
    info ( msg ) {
        sender( { type: 'log', msg } );
    },
    error ( msg ) {
        sender( { type: 'error', msg } );
    },
    success ( msg ) {
        sender( { type: 'success', msg } );
    },
    stop ( msg ) {
        sender( { type: 'stop', msg } );
    },
    notice ( msg ) {
        sender( { type: 'notice', msg } );
    },
};



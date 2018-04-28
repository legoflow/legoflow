'use strict';

require('./messager');

const { dev, messager } = require('legoflow-engine');

process.on( 'message', dev );

process.on( 'uncaughtException', ( err ) => {
    console.error( '[DEV@UNCAUGHT EXCEPTION]', err );

    messager.error( err );
} );

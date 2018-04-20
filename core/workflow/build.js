'use strict';

require('./messager');

const { build, messager } = require('legoflow-engine');

process.on( 'message', build );

process.on( 'uncaughtException', ( err ) => {
    console.error( '[BUILD@UNCAUGHT EXCEPTION]', err );

    messager.error( err );
} );

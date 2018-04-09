'use strict';

const messager = require('./modules/messager');
const webpackEntry = require('./modules/webpack_entry');

const webpack = require('./build/webpack');

const run = async ( _config_ ) => {
    // common config reslove
    let config = require('./modules/resolve_config')( 'build', _config_ );

    const entryFiles = webpackEntry( 'build', config );

    config.entry = entryFiles;

    process.argv.config = config;

    try {
        await webpack( config, messager );

        messager.success( config );
    } catch ( err ) {
        console.error( '[BUILD@WEBPACK ERROR]', err );

        messager.error( err );
    }
}

process.on( 'message', run );

process.on( 'uncaughtException', ( err ) => {
    console.error( '[BUILD@UNCAUGHT EXCEPTION]', err );

    messager.error( err );
} );


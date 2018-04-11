'use strict';

const del = require('del');
const fs = require('fs-extra');
const moment = require('moment');

const messager = require('./modules/messager');
const webpackEntry = require('./modules/webpack_entry');

const webpack = require('./build/webpack');
const gulp = require('./build/gulp');

const run = async ( _config_ ) => {
    // common config reslove
    let config = require('./modules/resolve_config')( _config_ );

    const entryFiles = webpackEntry( config );

    config.entry = entryFiles;

    config.banner = `
/*!
 * ${ config.name }
 * @version: ${ config.version }
 * @author: ${ config.user }
 * @update: ${ moment( ).format('YYYY-MM-DD hh:mm:ss') }
 */
`;

    process.argv.config = config;

    try {
        del.sync( `${ config.path }/dist`, { force: true } );

        fs.mkdirSync( `${ config.path }/dist` );
        fs.mkdirSync( `${ config.path }/dist/img` );
        fs.mkdirSync( `${ config.path }/dist/css` );
        fs.mkdirSync( `${ config.path }/dist/js` );

        await webpack( config, messager );

        await gulp( config, messager );

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


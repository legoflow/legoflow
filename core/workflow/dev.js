'use strict';

const messager = require('./modules/messager');
const webpackEntry = require('./modules/webpack_entry');

const devWebpack = require('./dev/webpack');
const devGulp = require('./dev/gulp');

const axios = require('axios');

const network = require('network');

let config = void 0;
let localIP = void 0;
let getLocalIPCounter = 0;

network.get_private_ip( ( err, ip ) => {
    if ( err ) throw err; localIP = ip;
} )

const webpackTimer = ( ip, port, resolve ) => {
    axios( `http://${ ip }:${ port }` ).then( ( response ) => {
        if ( response.status == 200 && response.data.length > 0 ) {
            resolve( );
        }
        else{
            setTimeout( ( ) => {
                webpackTimer( ip, port, resolve );
            }, 1000 );
        }
    } );
}

const run = async ( _config ) => {
    if ( !localIP && getLocalIPCounter < 10 ) {
        ++getLocalIPCounter;
        setTimeout( ( ) => run( _config ) , 300 );
        return void 0;
    }
    else if ( getLocalIPCounter >= 10 ) {
        localIP = '127.0.0.1';
    }

    _config.ip = localIP;

    config = _config;

    process.argv.config = config;

    const entryFiles = webpackEntry( 'dev', config );

    config.entry = entryFiles;

    try {
        await devWebpack( config );

        await ( ( ) => new Promise( ( resolve, reject ) => {
            webpackTimer( config.ip, config.webpackPort, resolve );
        } ) )( )

        await devGulp( config );
    } catch ( err ) {
        console.error( '[DEV@WEBPACK ERROR]', err );
    }

    messager.success( `http://${ config.ip }:${ config.port }` );
}

process.on( 'message', run );

process.on( 'uncaughtException', ( err ) => {
    console.error( '[DEV@UNCAUGHT EXCEPTION]', err );

    messager.error( err );
} );

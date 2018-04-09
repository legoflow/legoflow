'use strict';

const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const override = require('electron-override-modules');

const root = path.resolve( __dirname, '../' );

override.config( {
    debug: true,
    root,
    entry: path.resolve( root, './override' ),
} );

( async ( ) => {
    await override.start( );

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( 'override success' ) }` ) );

    const env = process.argv[ 2 ] || '';

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( `env#${ env || 'build' }` ) }` ) );

    shell.exec( `electron ${ root } ${ env }` );
} )( )


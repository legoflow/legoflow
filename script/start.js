'use strict';

const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const override = require('electron-override-modules');

const root = path.resolve( __dirname, '../' );
const nodeModules = path.resolve( root, './node_modules' );
const nodeModulesOverride = path.resolve( root, './node_modules_override' );

override.config( {
    debug: true,
    root: nodeModules,
    entry: nodeModulesOverride,
} );

( async ( ) => {
    await override.start( );

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( 'override success' ) }` ) );

    const env = process.argv[ 2 ] || '';

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( `env#${ env || 'build' }` ) }` ) );

    shell.exec( `electron ${ root } ${ env }` );
} )( )


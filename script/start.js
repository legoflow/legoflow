'use strict';

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const YAML = require('yamljs');
const override = require('electron-override-modules');

const root = path.resolve( __dirname, '../' );
const nodeModules = path.resolve( root, './node_modules' );
const nodeModulesOverride = path.resolve( root, './node_modules_override' );
const personConfigPath = path.resolve( root, './.personconfig' );

const personConfig = fs.existsSync( personConfigPath ) ? YAML.parse( fs.readFileSync( personConfigPath, 'utf8' ) ) : { };

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

    shell.exec( `electron ${ root } ${ env } "${ encodeURI( JSON.stringify( personConfig ) ) }"` );
} )( )


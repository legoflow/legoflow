'use strict';

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const YAML = require('yamljs');

const root = path.resolve( __dirname, '../' );
const personConfigPath = path.resolve( root, './.personconfig' );

const personConfig = fs.existsSync( personConfigPath ) ? YAML.parse( fs.readFileSync( personConfigPath, 'utf8' ) ) : { };

( async ( ) => {
    const env = process.argv[ 2 ] || 'build';

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( `env#${ env || 'build' }` ) }` ) );

    shell.exec( `electron ${ root } ${ env } "${ encodeURI( JSON.stringify( personConfig ) ) }"` );
} )( )


'use strict';

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const YAML = require('yamljs');

const override = require('legoflow-engine/override');

const root = path.resolve( __dirname, '../' );
const personConfigPath = path.resolve( root, './.personconfig' );

const personConfig = fs.existsSync( personConfigPath ) ? YAML.parse( fs.readFileSync( personConfigPath, 'utf8' ) ) : { };

( async ( ) => {
    await override(
        path.resolve( root, './node_modules' ),
        path.resolve( root, './node_modules/legoflow-engine/node_modules_override' ),
        true,
    )

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( '[Override Engine files] success' ) }` ) );

    const env = process.argv[ 2 ] || 'build';

    console.log( chalk.green( `>>>>>>>>>> ${ chalk.bold( `env#${ env || 'build' }` ) }` ) );

    shell.exec( `electron ${ root } ${ env } "${ encodeURI( JSON.stringify( personConfig ) ) }"` );
} )( )


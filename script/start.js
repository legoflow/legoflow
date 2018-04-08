'use strict';

const path = require('path');
const shell = require('shelljs');

const override = require('electron-override-modules');

const root = path.resolve( __dirname, '../' );

override.config( {
    debug: true,
    root,
    entry: path.resolve( root, './override' ),
} );

( async ( ) => {
    await override.start( );

    console.log( '>>>>>>>>>>>>>>>>> override success' );

    shell.exec( `electron ${ root } dev` );
} )( )

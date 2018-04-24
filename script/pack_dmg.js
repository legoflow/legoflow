'use strict';

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const del = require('del');

const root = path.resolve( __dirname, '../' );
const appPath = path.resolve( root, './dist/LegoFlow 2-darwin-x64' );
const app = path.resolve( appPath, './LegoFlow 2.app' );

const { version } = require( `${ root }/package.json` );

const dmg = `LegoFlow-2-${ version }.dmg`;
const dmgPath = path.resolve( appPath, `./${ dmg }` );
const newDmg = `LegoFlow-2-macOS-${ version }.dmg`;
const newDmgPath = path.resolve( appPath, `./${ newDmg }` );

if ( !fs.existsSync( app ) ) {
    console.error( 'app undefined' );

    return void 0;
}

del.sync( [ dmgPath, newDmgPath ], { force: true } );

shell.cd( appPath );

console.log( 'packing...' );

if ( shell.exec( `create-dmg 'LegoFlow 2.app'` ).code === 1 ) {
    fs.renameSync( dmg, newDmg );

    console.log( 'OK' );
}

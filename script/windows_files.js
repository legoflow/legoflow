'use strict';

const path = require('path');
const fs = require('fs-extra');
const del = require('del');

const root = path.resolve( __dirname, '../' );
const windowsFolder = path.resolve( root, './__windows_files__' );

del.sync( windowsFolder );
fs.mkdirSync( windowsFolder );

const files = [
    '__test__', '.personconfig', 'core', 'icon', 'node_modules_override', 'package.json', 'project_type',
    'README.md', 'script', 'store', 'view', 'index.js', 'LICENSE', '.nvmrc',
]

for ( let file of files ) {
    const filePath = path.resolve( root, `./${ file }` );
    const distFilePath = path.resolve( windowsFolder, `./${ file }` );

    fs.copySync( filePath, distFilePath );
}

del.sync( `${ windowsFolder }/**/.DS_Store` );

console.log( 'OK' );

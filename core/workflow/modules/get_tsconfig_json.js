'use strict';

const path = require('path');
const fs =  require('fs');

module.exports = function ( config ) {
    const { root, projectPath } = config;

    const defalutTsConfigJsonFilePath = path.resolve( root, './store/tsconfig.json' );
    const projectTsConfigJsonFilePath = path.resolve( projectPath, './tsconfig.json' );

    if ( fs.existsSync( projectTsConfigJsonFilePath ) ) {
        return projectTsConfigJsonFilePath;
    }
    else {
        return defalutTsConfigJsonFilePath;
    }
};

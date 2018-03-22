'use strict';

const path = require('path');
const fs =  require('fs');

module.exports = function ( config ) {
    const { root, projectPath } = config;

    const defalutTsConfigJsonFilePath = path.resolve( root, './store/tsconfig.json' );
    const projectTsConfigJsonFilePath = path.resolve( projectPath, './tsconfig.json' );

    const defalutTsConfigJsonContext = path.resolve( root, './store' );
    const projectTsConfigJsonContext = path.resolve( root, './' );

    if ( fs.existsSync( projectTsConfigJsonFilePath ) ) {
        return [ projectTsConfigJsonFilePath, projectTsConfigJsonContext ];
    }
    else {
        return [ defalutTsConfigJsonFilePath, defalutTsConfigJsonContext ];
    }
};

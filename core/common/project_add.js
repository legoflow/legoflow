'use strict';

const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

module.exports = async ( data ) => {
    const { path: projectPath } = data;

    const legolfowFiles = glob.sync( `${ projectPath }/legoflow.*` );
    const packageJson = path.resolve( projectPath, './package.json' );

    if ( legolfowFiles.length === 0 || !fs.existsSync( packageJson )) {
        return '项目缺少配置文件';
    }

    const legoflowData = projectPath.getConfig( );

    const packageData = fs.readJSONSync( packageJson );

    return {
        name: legoflowData.name || packageData.name,
        version: packageData.version || '0.0.0',
        path: projectPath,
    };
};

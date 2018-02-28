'use strict';

const path = require('path');
const fs = require('fs-extra');

module.exports = async ( data ) => {
    let { name, type, path: projectPath, version, isESNext, isSourcePath } = data;

    if ( !isSourcePath ) {
        projectPath = path.resolve( projectPath, `./${ name }` );
    }

    if ( fs.existsSync( projectPath ) ) {
        return '项目已存在';
    }

    const projectTypePath = path.resolve( __dirname, `../../project_type/${ type }` );

    if ( !fs.existsSync( projectTypePath ) ) {
        return '找不到该类型项目';
    }

    fs.ensureDirSync( projectPath );

    // package.json
    let packageJSON = {
        name,
        version,
        author: __config.user,
    };

    fs.writeFileSync( path.resolve( projectPath, './package.json' ), JSON.stringify( packageJSON, null, 4 ) );

    // legoflow.json
    let legoflowJSON = {
        version: __config.version,
        type,
        REM: false,
        'ES.Next': isESNext,
        alias: { },
        global: { },
        externals: { },
    };

    switch ( type ) {
		case 'mobile': {
            legoflowJSON.REM = true;
            legoflowJSON.alias = { $: './src/assets/zepto.min.js', zepto: './src/assets/zepto.min.js' };
			legoflowJSON.global = { $: 'zepto', zepto: 'zepto', };
			break;
        }
		case 'pc': {
            legoflowJSON.alias = { $: './src/assets/jquery.min.js', jquery: './src/assets/jquery.min.js', jQuery: './src/assets/jquery.min.js', };
			legoflowJSON.global = { $: 'jquery', jquery: 'jquery', jQuery: 'jquery', };
			break;
        }
		case 'vue': {
            legoflowJSON.externals = { vue: 'Vue' };
		    break;
        }
	}

    fs.writeFileSync( path.resolve( projectPath, './legoflow.json' ), JSON.stringify( legoflowJSON, null, 4 ) );

    // cope type folder
    fs.copySync( projectTypePath, path.resolve( projectPath, './src' ) );

    // cope .gitignore
    const gitignoreFile = path.resolve( __dirname, '../../project_type/.gitignore' );

    fs.copySync( gitignoreFile, path.resolve( projectPath, './.gitignore' ) );
};

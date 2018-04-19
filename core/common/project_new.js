'use strict';

const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');
const lineReader = require('line-reader');

const formatYamlFile = ( file ) => {
    let newFileContent = '';
    let row = 0;

    return new Promise( ( resolve, reject ) => {
        lineReader.eachLine( file, { encoding: 'utf8' }, ( line, last ) => {
            ++row;

            if ( typeof line[ 0 ] !== 'undefined' && /\S/.test( line[ 0 ]) && line[ 0 ] != '' ) {
                if ( newFileContent == '' ) {
                    newFileContent = line;
                }
                else {
                    newFileContent += '\n';
                    newFileContent += `\n${ line }`;
                }
            }
            else {
                newFileContent += `\n${ line }`;
            }

            if ( last ) {
                resolve( newFileContent );
            }
        } );
    } );
}

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
        name,
        version: __config.version,
        type,
        REM: false,
        'ES.Next': isESNext,
        alias: { },
        global: { },
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

    const configFile = path.resolve( projectPath, './legoflow.yml' );

    fs.writeFileSync( configFile, YAML.stringify( legoflowJSON, 4 ) );

    // format YAML file
    fs.writeFileSync( configFile, await formatYamlFile( configFile ) );

    // cope type folder
    fs.copySync( projectTypePath, path.resolve( projectPath, './src' ) );

    // cope .gitignore
    const gitignoreFile = path.resolve( __dirname, '../../project_type/gitignore' );

    fs.copySync( gitignoreFile, path.resolve( projectPath, './.gitignore' ) );

    return Object.assign( data, { path: projectPath } );
};

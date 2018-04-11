'use strict';

const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');

// 路径标准化
String.prototype.pathNorm = function ( ) {
    return this.toString( ).replace( /\\/g, '/' );
}

// 配置文件路径 转配置
String.prototype.toConfig = function ( ) {
    const p = this.toString( );

    if ( !fs.existsSync( p ) ) {
        console.error( `${ p } undefined.` );
        return void 0;
    }

    const extname = path.extname( p );

    let config = void 0;

    if ( extname == '.yml' ) {
        config = YAML.load( p );
    }
    else {
        delete require.cache[ p ];

        config = require( p );

        switch ( extname ) {
            case '.js': {
                typeof config === 'function' ? config = config( ) : void 0;
                break;
            }
        }
    }

    return config;
}

// 路径字符串 转配置
String.prototype.getConfig = function ( _config_ = { } ) {
    const folder = this.toString( );

    const jsonConfig = path.resolve( folder, './legoflow.json' );
    const ymlConfig = path.resolve( folder, './legoflow.yml' );
    const jsConfig = path.resolve( folder, './legoflow.js' );
    const packageJson = path.resolve( folder, './package.json' );

    let config = void 0;

    if ( fs.existsSync( jsonConfig ) ) {
        config = jsonConfig.toConfig( );
    }
    else if ( fs.existsSync( ymlConfig ) ) {
        config = ymlConfig.toConfig( );
    }
    else if ( fs.existsSync( jsConfig ) ) {
        config = jsConfig.toConfig( );
    }

    const packageJsonData = packageJson.toConfig( );

    const { name, version, author } = packageJsonData || { };

    if ( config ) {
        config = Object.assign( config, __config, _config_, {
            name: config.name || name,
            version: version || _config_.version,
            user: author || __config.user,
        } );

        if ( !config[ 'workflow.dev' ] ) {
            config[ 'workflow.dev' ] = { }
        }

        if ( !config[ 'workflow.build' ] ) {
            config[ 'workflow.build' ] = { }
        }
    }

    return config;
}

const util = { };

module.exports = util;

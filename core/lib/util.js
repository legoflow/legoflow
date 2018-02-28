'use strict';

const path = require('path');
const fs = require('fs-extra');

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

    const basename = path.extname( p );

    delete require.cache[ p ];

    let config = require( p );

    switch ( basename ) {
        case '.js': {
            typeof config === 'function' ? config = config() : void 0;
            break;
        }
    }

    return config;
}

// 路径字符串 转配置
String.prototype.getConfig = function ( ) {
    const folder = this.toString( );

    const jsonConfig = path.resolve( folder, './legoflow.json' );
    const jsConfig = path.resolve( folder, './legoflow.js' );

    if ( fs.existsSync( jsonConfig ) ) {
        return jsonConfig.toConfig( );
    }

    if ( fs.existsSync( jsConfig ) ) {
        return jsConfig.toConfig( );
    }

    return void 0;
}

const util = { };

module.exports = util;

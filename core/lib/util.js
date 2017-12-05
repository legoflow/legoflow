'use strict';

const path = require('path');
const fs = require('fs-extra');

String.prototype.pathNorm = function ( ) {
    return this.toString().replace( /\\/g, '/' );
}

String.prototype.toConfig = function ( ) {
    const p = this.toString();

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

const util = { };

module.exports = util;

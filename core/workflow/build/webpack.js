'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const webpackRules = require('../modules/webpack_rules');
const webpackResolve = require('../modules/webpack_resolve');
const webpackPlugins = require('../modules/webpack_plugins');

let config = void 0;
let messager = void 0;

const start = ( resolve, reject ) => {
    let { entry, ip, alias, projectPath, root, user, args, publicPath, version } = config;

    const { cache } = config[ 'workflow.build' ];

    let chunkFilename = '[name].js';

    switch ( cache ) {
        case 'timestamp':
            const time = ( new Date( ) ).getTime( );
            chunkFilename = `[name].${ time }.js`;
            break;
        case 'version':
            chunkFilename = `[name].${ version || '0.0.0' }.js`;
            break;
    }

    const webpackOptions = {
        mode: 'production',
        entry,
        output: {
            filename: '[name].js',
            chunkFilename,
            path: `${ projectPath }/dist/js`,
            publicPath: publicPath || '',
        },
        module: {
            rules: webpackRules( config ),
        },
        externals: config.externals || { },
        resolve: webpackResolve( config ),
        plugins: webpackPlugins( config ),
        context: path.resolve( root, './node_modules' ),
    }

    const compiler = webpack( webpackOptions );

    compiler.run( ( error, stats ) => {
        if ( error ) {
            messager.stop( `JS 打包错误: ${ error.toString( ) }` );

            return void 0;
        }

        messager.log( 'JS 构建完成' );

        resolve( );
    } )
};

module.exports = ( _config_, _messager_ ) => new Promise( ( resolve, reject ) => {
    config = _config_;
    messager = _messager_;

    start( resolve, reject );
} );

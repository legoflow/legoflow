'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackRules = require('../modules/webpack_rules');
const webpackResolve = require('../modules/webpack_resolve');
const webpackPlugins = require('../modules/webpack_plugins');

let config = void 0;
let messager = void 0;

const start = ( resolve, reject ) => {
    let { entry, ip, webpackPort, projectPath, root, hot } = config;

    const isHotReload = config[ 'hot.reload' ] || false;

    const srcFolderPath = path.resolve( projectPath, './src' );

    const webpackOptions = {
        mode: 'development',
        // devtool: 'cheap-eval-source-map',
        devtool: 'inline-source-map',
        entry,
        output: {
            filename: './js/[name].js',
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

    let webpackDevServerOptions =  {
        contentBase: srcFolderPath,
        hot: isHotReload,
        historyApiFallback: false,
        compress: false,
        noInfo: false,
        lazy: false,
        quiet: true,
        filename: 'bundle.js',
        watchOptions: {
            aggregateTimeout: 100,
            poll: 1000,
        }
    }

    if ( config.env === 'dev' ) {
        webpackDevServerOptions.quiet = false;
    }

    new webpackDevServer( compiler, webpackDevServerOptions ).listen( webpackPort, ip, ( err ) => {
        if ( err ) throw err;

        console.log( '[WEBPACK SERVER]', `http://${ ip }:${ webpackPort }` );

        resolve( );
    } );
};

module.exports = ( _config_, _messager_ ) => new Promise( ( resolve, reject ) => {
    config = _config_;
    messager = _messager_;

    start( resolve, reject );
} );

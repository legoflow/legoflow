'use strict';

const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = ( config ) => {
    let plugins = [
        new webpack.ProvidePlugin( config.global || { } ),
        new webpack.DefinePlugin( config.args || { } ),
        new CheckerPlugin( ),
    ]

    const workflowConfig = config[ `workflow.${ config.workflow }` ];

    // hot reload
    const isHotReload = config[ 'hot.reload' ] || false;

    if ( isHotReload && config.workflow == 'dev' ) {
        plugins.push( new webpack.HotModuleReplacementPlugin( ) );
    }

    //  banner
    if ( config.workflow === 'build' ) {
        plugins.push(
            new webpack.BannerPlugin( {
                banner: config.banner,
                raw: true,
            } )
        );
    }

    // output stats
    if ( config.workflow === 'build' && workflowConfig[ 'output.webpackStats' ] == true ) {
        plugins.push(
            new StatsPlugin( '../../stats.json', {
                chunkModules: true,
            } )
        )
    }

    return plugins;
};

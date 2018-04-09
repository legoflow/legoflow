'use strict';

const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = ( config ) => {
    let plugins = [
        new webpack.ProvidePlugin( config.global || { } ),
        new webpack.DefinePlugin( config.args || { } ),
        new CheckerPlugin( ),
    ]

    // hot reload
    const isHotReload = config[ 'hot.reload' ] || false;

    if ( isHotReload && config.workflow == 'dev' ) {
        plugins.push( new webpack.HotModuleReplacementPlugin( ) );
    }

    return plugins;
};

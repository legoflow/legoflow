'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const autoprefixer = require('autoprefixer');
const { CheckerPlugin } = require('awesome-typescript-loader');

const getTsConfigJson = require('../modules/get_tsconfig_json');
const babelOptions = require('../modules/babel_options');

let config = void 0;
let messager = void 0;

const start = ( resolve, reject ) => {
    let { entry, ip, alias, webpackPort, projectPath, root, user, hot, args } = config;

    const isESNext = config[ 'ES.Next' ];
    const isHotReload = config[ 'hot.reload' ] || false;

    const srcFolderPath = path.resolve( projectPath, './src' );
    const userNodeModulesFolderPath = path.resolve( root, './node_modules_user/node_modules' );

    const webpackOptions = {
        mode: 'development',
        // devtool: 'cheap-eval-source-map',
        devtool: 'inline-source-map',
        entry,
        output: {
            filename: './js/[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|svg|jpeg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { limit: 1024 * 100 * 100 * 100 * 100 },
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'to-string-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',  options: {
                                plugins: ( ) => [
                                    require('autoprefixer')( {
                                        browsers: [
                                            '> 0.01%',
                                        ]
                                    } )
                                ],
                              }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                },
                {
                    test: /\.tpl$/,
                    use: [ 'art-template-loader', ],
                },
                {
                    test: /\.html$/,
                    use: [ 'html-loader', ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /node_modules/,
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader',
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                            js: {
                                loader: 'babel-loader',
                                options: babelOptions,
                            },
                        },
                        preserveWhitespace: false,
                        postcss: [ autoprefixer( { browsers: [ '> 0.01%' ] } ) ],
                        // TODO: markup-inline-loader
                    },
                },
            ]
        },
        resolve: {
            alias,
            modules: [
                path.resolve( root, './node_modules' ),
                userNodeModulesFolderPath,
            ],
            extensions: [ '.js', '.ts', '.tsx', '.jsx', '.vue', '.art', '.scss', '.html', '.svg', '.json' ],
        },
        plugins: [
            new webpack.ProvidePlugin( config.global || { } ),
            new webpack.DefinePlugin( args || { } ),
            new CheckerPlugin( ),
        ],
    }

    if ( isHotReload ) {
        webpackOptions.plugins.push( new webpack.HotModuleReplacementPlugin( ) );
    }

    if ( isESNext ) {
        webpackOptions.module.rules.push(
            {
                test: /\.*(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                ]
            },
            {
                test: /\.*(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            silent: true,
                            configFileName: getTsConfigJson( config ),
                            useBabel: true,
                            babelCore: '@babel/core',
                            babelOptions: {
                                babelrc: false,
                                presets: babelOptions.presets,
                                plugins: babelOptions.plugins,
                            },
                        },
                    },
                ],
            }
        );
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

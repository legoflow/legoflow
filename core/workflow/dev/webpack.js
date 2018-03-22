'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const getTsConfigJson = require('../modules/get_tsconfig_json');

const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = async ( config ) => {
    let { entry, ip, alias, webpackPort, projectPath, root, user, hot } = config;

    const isESNext = config[ 'ES.Next' ];
    const isHotReload = config[ 'hot.reload' ] || false;

    const tsConfigJsonPath = path.resolve( root, './store/tsconfig.json' );

    const srcFolderPath = path.resolve( projectPath, './src' );
    const jsFolderPath = path.resolve( projectPath, './src/js' );
    const userNodeModulesFolderPath = path.resolve( root, './node_modules_user/node_modules' );

    const defalutAlias  = {
        js: jsFolderPath,
        '@user': userNodeModulesFolderPath,
    };

    for ( let i in alias ) {
         if ( alias[ i ].indexOf( './' ) === 0 ) {
            alias[ i ] = path.resolve( projectPath, alias[ i ] );
         }
    }

    alias = _.merge( defalutAlias, alias );

    let args = {
        'process.env': '"dev"',
        'process.args': { },
    }

    const configUserDevArgs = config[ 'user.dev.args' ];

    if ( typeof configUserDevArgs != 'undefined' ) {
        for ( let key in configUserDevArgs ) {
            if ( key === user && key !== '*' ) {
                args[ 'process.args' ] = _.assign( args[ 'process.args' ], configUserDevArgs[ key ] );
            }
            else if ( key === '*' ) {
                args['process.args'] = _.assign( args[ 'process.args' ], configUserDevArgs[ key ] );
            }
        }
    }

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
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                silent: true,
                                configFileName: tsConfigJsonPath,
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                silent: true,
                                configFileName: tsConfigJsonPath,
                            },
                        },
                    ],
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

    new webpackDevServer( compiler, webpackDevServerOptions )
        .listen( webpackPort, ip, ( err ) => {
            if ( err ) throw err;

            console.log( '[WEBPACK SERVER]', `http://${ ip }:${ webpackPort }` );
        } );
};

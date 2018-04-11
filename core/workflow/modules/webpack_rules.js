'use strict';

const autoprefixer = require('autoprefixer');

const getTsConfigJson = require('../modules/get_tsconfig_json');
const babelOptions = require('../modules/babel_options');

module.exports = ( config ) => {
    const isESNext = config[ 'ES.Next' ];

    const { workflow } = config;

    const workflowConfig = config[ `workflow.${ workflow }` ] || { };

    const imgSize = ( workflow == 'build' && workflowConfig[ 'bundle.imgSize' ] ) ? workflowConfig[ 'bundle.imgSize' ] : 1024 * 100;

    const rules = [
        {
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: [
                {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 1024 * imgSize,
                        name: '../img/[name].[ext]?[hash]',
                        root: 'img',
                    },
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: require.resolve('to-string-loader')
                },
                {
                    loader: require.resolve('css-loader'),
                },
                {
                    loader: require.resolve('postcss-loader'),  options: {
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
                    loader: require.resolve('sass-loader'),
                }
            ]
        },
        {
            test: /\.tpl$/,
            use: [ require.resolve('art-template-loader'), ],
        },
        {
            test: /\.html$/,
            use: [ require.resolve('html-loader'), ],
        },
        {
            test: /\.vue$/,
            loader: require.resolve('vue-loader'),
            exclude: /node_modules/,
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader',
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    js: {
                        loader: require.resolve('babel-loader'),
                        options: babelOptions,
                    },
                },
                preserveWhitespace: false,
                postcss: [ autoprefixer( { browsers: [ '> 0.01%' ] } ) ],
                // TODO: markup-inline-loader
            },
        },
    ];

    if ( isESNext ) {
        rules.push(
            {
                test: /\.*(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: babelOptions,
                    },
                ]
            },
            {
                test: /\.*(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('awesome-typescript-loader'),
                        options: {
                            silent: true,
                            configFileName: getTsConfigJson( config ),
                            useBabel: true,
                            babelCore: require.resolve('@babel/core'),
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

    return rules;
};

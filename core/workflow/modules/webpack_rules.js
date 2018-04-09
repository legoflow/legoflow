'use strict';

const autoprefixer = require('autoprefixer');

const getTsConfigJson = require('../modules/get_tsconfig_json');
const babelOptions = require('../modules/babel_options');

module.exports = ( config ) => {
    const isESNext = config[ 'ES.Next' ];

    const rules = [
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
    ];

    if ( isESNext ) {
        rules.push(
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

    return rules;
};

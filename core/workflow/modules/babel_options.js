'use strict';

module.exports = {
    presets: [
        '@babel/preset-es2015',
        '@babel/preset-stage-0',
        [
            '@babel/preset-env',
            { 'targets': { 'browsers': [ 'android >= 4' ] } },
        ],
    ],
    plugins: [
        [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
        '@babel/plugin-proposal-decorators',
        [ '@babel/plugin-proposal-class-properties', { loose: true } ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-pipeline-operator',
        '@babel/plugin-transform-runtime',
    ],
};

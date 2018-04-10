'use strict';

module.exports = {
    presets: [
        require.resolve('@babel/preset-es2015'),
        require.resolve('@babel/preset-stage-0'),
        [
            require.resolve('@babel/preset-env'),
            { 'targets': { 'browsers': [ 'android >= 4' ] } },
        ],
    ],
    plugins: [
        [ require.resolve('@babel/plugin-transform-react-jsx'), { pragma: 'h' } ],
        require.resolve('@babel/plugin-proposal-decorators'),
        [ require.resolve('@babel/plugin-proposal-class-properties'), { loose: true } ],
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('@babel/plugin-proposal-pipeline-operator'),
        require.resolve('@babel/plugin-transform-runtime'),
    ],
};

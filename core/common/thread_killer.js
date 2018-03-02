'use strict';

const ps = require('ps-node');
const { kill } = require('cross-port-killer');

module.exports = ( ) => {
    // kill workflow of dev
    for ( let key in global.__workflowDevPid ) {
        if ( __workflowDevPid[ key ] && __workflowDevPid[ key ].pid ) {
            ps.kill( _workflowDevPid[ key ].pid );
        }
    }

    // kill workflow of build
    for ( let key in global.__workflowBuildPid ) {
        if ( __workflowBuildPid[ key ] ) {
            ps.kill( __workflowBuildPid[ key ] );
        }
    }

    // kill thread by webpack port
    const webpackPort = __config.env === 'dev' ? __config.webpack.originPortDev : __config.webpack.originPort;
    for ( let i = webpackPort, max = webpackPort + 10; i < max; i++ ) {
        kill( i );
    }
};

'use strict';

const path = require('path');
const del = require('del');
const shell = require('shelljs');

module.exports = ( { config: { projectPath }, messager, nodeBinExec } ) => {
    messager.log( '删除原有 zip' );

    del.sync( [ `${ projectPath }/dist.zip` ], { force: true } );

    messager.log( '打包中' );

    shell.cd( projectPath );

    if ( shell.exec( 'zip -r dist.zip dist' ).code === 0 ) {
        messager.log( '打包完成' );

        messager.success( );
    }
    else {
        messager.stop( '打包错误' );
    }
};

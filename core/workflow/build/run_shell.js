'use strict';

const fs = require('fs-extra');

module.exports = ( shell, config, messager ) => {
    messager.log( '------- start to exec shell -------' );

    delete require.cache[ shell ];

    shell = require( shell );

    const { nodeBin } = config;

    const nodeBinExec =  ( root, file, callback ) => {
        if ( !nodeBin || ( nodeBin && !fs.existsSync( nodeBin ) ) ) {
            messager.stop( 'node bin undefined.' );

            return void 0;
        }

        shell.cd( root );

        shell.exec( `${ nodeBin } ${ file }`, callback );
    }

    shell( {
        config, messager, nodeBinExec,
    } );
};

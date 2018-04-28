'use strict';

const path = require('path');

module.exports = ( { del, folder, gulp, messager } ) => {
    const view = path.resolve( folder, '../view' );
    const source = path.resolve( folder, './dist' );

    del( [ `${ view }/**/*` ], { force: true }, ( ) => {
        gulp.src( `${ source }/**/*` )
            .pipe( gulp.dest( view ) )
            .on( 'end', ( ) => {
                messager.success( );
            } )
    } );
}

'use strict';

const { dialog } = require('electron').remote;

window.appUtil = {
    debounce ( time, action ) {
        var timer = void 0;

        return function ( ) {
            var ctx = this, args = arguments;

            if ( timer ) { clearTimeout( timer ) }

            timer = setTimeout( function ( ) {
                action.apply( ctx, args );
            }, time );
        }
    },
    openDialog ( ) {
        return new Promise( ( resolve, reject ) => {
            dialog.showOpenDialog( { properties: [ 'openDirectory' ] }, ( path ) => {
                resolve( path ? path[ 0 ] : void 0 );
            } )
        } );
    },
    UUID ( ) {
        function s4 ( ) {
            return Math.floor( ( 1 + Math.random( ) )  * 0x10000 ).toString( 16 ).substring( 1 );
        }

        return s4( ) + s4( ) + new Date( ).getTime( );
    },
}

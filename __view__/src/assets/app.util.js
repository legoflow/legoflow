'use strict';

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
    }
}

'use strict';

import AlertComponent from './component.vue';

let alertQueue = [ ];

Object.defineProperty( window, 'alert', {
	get ( option ) {
		return ( option ) => {
            const Alert = _.cloneDeep( AlertComponent );

			if ( typeof option === 'object' ) {
                const { msg, callback, btns, top, list } = option;

                typeof msg !== 'undefined' && ( Alert.data.msg = msg );
                typeof callback !== 'undefined' && ( Alert.data.callback = callback );
                typeof btns !== 'undefined' && ( Alert.data.btns = btns );
                typeof top !== 'undefined' && ( Alert.data.top = top );
                typeof list !== 'undefined' && ( Alert.data.list = list );
            }
            else {
				Alert.data.msg = option;
            }

            const alertConstructor = ( ) => {
                const vm = new Vue( Alert );

                alertQueue.push( vm );
                vm.queue = alertQueue;

                const appElement = document.getElementById( 'app' );

                const container = appElement || document.body;

                container.appendChild( vm.$el );
            }

			if ( alertQueue.length > 0 ){
                alertQueue[ 0 ].hide( );

				setTimeout( ( ) => {
                    alertConstructor( );
                }, 500 )

                return void 0;
            }

            alertConstructor( );
		};
	},
} );

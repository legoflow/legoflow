'use strict';

const LOG_TO_HTML = ( msg ) => {
    const p = document.createElement( 'p' );
    p.innerHTML = msg;
    document.body.appendChild( p );
}

require('./modules/test-js.js')( );

LOG_TO_HTML( require('./modules/1.png').substring( 0, 30 ) );

LOG_TO_HTML( require('./modules/test-scss.scss') );

LOG_TO_HTML( require('./modules/test-html.html') );

LOG_TO_HTML( require('./modules/test-tpl.tpl')( { name: 'test' } ) );

// import testTS from './modules/test-ts.ts';

// LOG_TO_HTML( testTS( '1' ) );

const testPromise = ( name ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout( ( ) => {
            resolve( `Hello, ${ name }` );
        }, 3000 );
    } );
}

( async ( ) => {
    LOG_TO_HTML( await testPromise( 'legoflow' ) );
} )( );

console.log( '[optional-chaining-test]', window.test?.( ) );

import vueComponent from './modules/test-vue';

new Vue( {
    el: 'app',
    store: new Vuex.Store( {
        state: {
            msg: 'bar'
        },
        mutations: {
            SET_MSG ( state, v ) { state.msg = v },
        },
    } ),
    components: { vueComponent },
    // render ( ) {
    //     return ( <div id="vue"><vue-component/></div> );
    // },
    template: '<div id="vue"><vue-component/></div>',
} )

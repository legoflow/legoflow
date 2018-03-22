'use strict';

require('./modules/test-js.js')( );

console.log( require('./modules/1.png').substring( 0, 30 ) );

// console.log( require('./modules/a.scss') );

console.log( require('./modules/test-html.html') );

console.log( require('./modules/test-tpl.tpl')( { name: 'test' } ) );

import testTS from './modules/test-ts.ts';

testTS( '1' );

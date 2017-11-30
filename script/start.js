'use strict';

const path = require('path');
const shell = require('shelljs');

const root = path.resolve( __dirname, '../' );

shell.exec( `electron ${ root } dev` );

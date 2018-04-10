'use strict';

const fs = require('fs-extra');
const path = require('path');
const del = require('del');

module.exports = ( ) => {
    const gulpSassInsideSass = path.resolve( __dirname, '../node_modules/gulp-sass/node_modules/node-sass' );

    if ( fs.existsSync( gulpSassInsideSass ) ) {
        del.sync( gulpSassInsideSass, { force: true } );
    }
};

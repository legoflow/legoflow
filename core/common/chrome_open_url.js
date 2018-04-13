'use strict';

const { exec } = require('child_process');

module.exports = ( url ) => {
    if ( __config.system === 'mac' ) {
        exec( `open -a "google chrome" ${ url }` );
    }
    else {
        exec( `start chrome "${ url }"` );
    }
};

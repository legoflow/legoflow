'use strict';

const remote = require('electron').remote;

window.remote = remote;

// default app config.
window.config = {
    system: 'mac',
    version: '2.0.0',
};

window.config = Object.assign( config, remote.getGlobal( '__config' ) );

console.info( '[START CONFIG]', window.config );

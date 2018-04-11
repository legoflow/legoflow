'use strict';

const { app } = require('electron');

const threadKiller = require('./core/common/thread_killer');

process.on( 'uncaughtException', ( e ) => {
    console.error( e );

    throw e;
} );

app.on( 'ready', require('./core/startup')( app ) );

app.on( 'before-quit', threadKiller );


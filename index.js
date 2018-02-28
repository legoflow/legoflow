'use strict';

const { app } = require('electron');

process.on( 'uncaughtException', ( e ) => {
    console.error( e );
} );

app.on( 'ready', require('./core/startup')( app ) );

app.on( 'before-quit', ( ) => {

} )


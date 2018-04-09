'use strict';

const notifier = require('node-notifier');

module.exports = function ( message ) {
    notifier.notify( {
        title: 'LegoFlow',
        message,
        sound: true,
    } )
};

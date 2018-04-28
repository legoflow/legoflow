'use strict';

const notifier = require('node-notifier');
const path = require('path');

module.exports = function ( message ) {
    notifier.notify( {
        title: 'LegoFlow',
        message,
        sound: true,
    } )
};

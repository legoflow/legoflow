'use strict';

const path = require('path');
const del = require('del');
const shell = require('shelljs');

module.exports = ( { config, messager, nodeBinExec, util } ) => {
    config.autoOpenChrome = false;
    // console.log( config.bsPort );
};

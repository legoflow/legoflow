'use strict';

const legoflowConfig = require('legoflow-config');

const CONFIG_STORAGE_MAPPING = {
    user: '@user',
    port: '@port',
    editor: '@editor',
    autoOpenChrome: '@autoOpenChrome',
    lab: '@lab',
    nodeBin: '@nodeBin',
    customProjectPath: '@customProjectPath',
}

let window = void 0;

const setLocalStorage = ( key, value ) => {
    return new Promise( ( resolve, reject ) => {
        window.webContents.executeJavaScript( `localStorage.setItem( '${ key }', '${ value }' )` ).then( ( v ) => { resolve( v ) } );
    } );
}

exports.init = ( _window_ ) => {
    window = _window_;

    __config = Object.assign( __config, legoflowConfig.get( ) );
}

exports.setConfig = async ( ) => {
    for ( let [ ckey, skey ] of Object.entries( CONFIG_STORAGE_MAPPING ) ) {
        await setLocalStorage( skey, __config[ ckey ] );
    }
};

exports.update = ( name, value ) => {
    legoflowConfig.set( name, value );
}

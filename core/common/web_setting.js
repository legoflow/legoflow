'use strict';

const USER = '@user';
const PORT = '@port';
const EDITOR = '@editor';
const AUTO_OPEN_CHROME = '@autoOpenChrome';
const LAB = '@lab';
const NODE_BIN = '@nodeBin';

let getLocalStorage = void 0;

const init = ( window ) => {
    getLocalStorage = ( flag ) => {
        return new Promise( ( resolve, reject ) => {
            window.webContents.executeJavaScript( `localStorage.getItem( '${ flag }' )` ).then( ( v ) => { resolve( v ) } );
        } );
    }
}

module.exports = init;

init.get = ( key ) => {
    return new Promise( async ( resolve, reject ) => {
        switch ( key ) {
            case 'user': resolve( await getLocalStorage( USER ) ); break;
            case 'port': resolve( await getLocalStorage( PORT ) ); break;
            case 'editor': resolve( await getLocalStorage( EDITOR ) ); break;
            case 'nodeBin': resolve( await getLocalStorage( NODE_BIN ) ); break;
            case 'autoOpenChrome': resolve( JSON.parse( await getLocalStorage( AUTO_OPEN_CHROME ) ) ); break;
            case 'lab': resolve( JSON.parse( await getLocalStorage( LAB ) ) ); break;
                default:
                    resolve(
                        {
                            user: await getLocalStorage( USER ),
                            port: await getLocalStorage( PORT ),
                            editor: await getLocalStorage( EDITOR ),
                            nodeBin: await getLocalStorage( NODE_BIN ),
                            autoOpenChrome: JSON.parse( await getLocalStorage( AUTO_OPEN_CHROME ) ),
                            lab: JSON.parse( await getLocalStorage( LAB ) ),
                        }
                    );
        }
    } );
}

init.updateConfig = async ( ) => {
    __config = Object.assign( __config, await init.get( ) );
}

'use strict';

const USER = '@user';
const PORT = '@port';
const EDITOR = '@editor';
const AUTO_OPEN_CHROME = '@autoOpenChrome';

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
            case 'autoOpenChrome': resolve( JSON.parse( await getLocalStorage( AUTO_OPEN_CHROME ) ) ); break;
                default:
                    resolve(
                        {
                            user: await getLocalStorage( USER ),
                            port: await getLocalStorage( PORT ),
                            editor: await getLocalStorage( EDITOR ),
                            autoOpenChrome: JSON.parse( await getLocalStorage( AUTO_OPEN_CHROME ) ),
                        }
                    );
        }
    } );
}

init.updateConfig = async ( ) => {
    __config = Object.assign( __config, await init.get( ) );
}

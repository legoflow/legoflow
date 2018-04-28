'use strict';

const USER = '@user';
const PORT = '@port';
const EDITOR = '@editor';
const AUTO_OPEN_CHROME = '@autoOpenChrome';
const PROJECT = '@project';
const NODE_BIN = '@nodeBin';
const LAB = '@lab'

if ( !window.localStorage[ USER ] ) {
    window.localStorage[ USER ] = '';
}

if ( !window.localStorage[ PORT ] ) {
    window.localStorage[ PORT ] = '3000';
}

if ( !window.localStorage[ EDITOR ] ) {
    window.localStorage[ EDITOR ] = 'VSCode';
}

if ( !window.localStorage[ AUTO_OPEN_CHROME ] ) {
    window.localStorage[ AUTO_OPEN_CHROME ] = 'true';
}

if ( !window.localStorage[ PROJECT ] ) {
    window.localStorage[ PROJECT ] = '[]';
}

if ( !window.localStorage[ NODE_BIN ] ) {
    window.localStorage[ NODE_BIN ] = '';
}

if ( !window.localStorage[ LAB ] ) {
    window.localStorage[ LAB ] = 'false';
}

window.appSetting = {
    get ( key ) {
        switch ( key ) {
            case 'user': return window.localStorage[ USER ];
            case 'port': return window.localStorage[ PORT ];
            case 'editor': return window.localStorage[ EDITOR ];
            case 'autoOpenChrome': return JSON.parse( window.localStorage[ AUTO_OPEN_CHROME ] );
            case 'project': return JSON.parse( window.localStorage[ PROJECT ] );
            case 'nodeBin': return window.localStorage[ NODE_BIN ];
            case 'lab': return JSON.parse( window.localStorage[ LAB ] );
            default:
                return {
                    user: window.localStorage[ USER ],
                    port: window.localStorage[ PORT ],
                    editor: window.localStorage[ EDITOR ],
                    autoOpenChrome: JSON.parse( window.localStorage[ AUTO_OPEN_CHROME ] ),
                    project: JSON.parse( window.localStorage[ PROJECT ] ),
                };
        }
    },
    set ( key, value ) {
        switch ( key ) {
            case 'user': { window.localStorage[ USER ] = value; break; }
            case 'port': { window.localStorage[ PORT ] = value; break; }
            case 'editor': { window.localStorage[ EDITOR ] = value; break; }
            case 'nodeBin': { window.localStorage[ NODE_BIN ] = value; break; }
            case 'lab': { window.localStorage[ LAB ] = value; break; }
            case 'autoOpenChrome': { window.localStorage[ AUTO_OPEN_CHROME ] = value; break; }
            case 'project': {
                const data = _.cloneDeep( value );

                data.forEach( ( item, index ) => {
                    for ( let k in data[ index ].dev ) {
                        data[ index ].dev[ k ] = false;
                    }

                    data[ index ].build = false;
                } );

                window.localStorage[ PROJECT ] = JSON.stringify( data );

                break;
            };
        }

        window.ipc.updateConfig( {
            user: window.appSetting.get( 'user' ),
            port: window.appSetting.get( 'port' ),
            editor: window.appSetting.get( 'editor' ),
            nodeBin: window.appSetting.get( 'nodeBin' ),
            lab: window.appSetting.get( 'lab' ),
            autoOpenChrome: window.appSetting.get( 'autoOpenChrome' ),
        } );
    },
    clear ( ) {
        delete window.localStorage[ USER ];
        delete window.localStorage[ PORT ];
        delete window.localStorage[ EDITOR ];
        delete window.localStorage[ AUTO_OPEN_CHROME ];
        delete window.localStorage[ PROJECT ];
        delete window.localStorage[ NODE_BIN ];
        delete window.localStorage[ LAB ];
    },
}

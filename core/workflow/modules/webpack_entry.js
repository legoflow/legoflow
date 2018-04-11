'use strict';

const path = require('path');
const glob = require('glob');

module.exports = ( { hot, entry, projectPath, ip, webpackPort, workflow } ) => {
    let files = entry || [ ];
    let entrys = { };

    if ( !entry ) {
        const jsFolderPath = path.resolve( projectPath, './src/js' );

        files = glob.sync( `${ jsFolderPath }/*.*(js|ts)` ) || [ ];
    }

    files.forEach( ( item, index ) => {
        if ( path.basename( item )[ 0 ] !== '_' ) {
            let basename = void 0;

            if ( item.indexOf( '.js' ) > 0 ) {
                basename = path.basename( item, '.js' );
            }
            else if ( item.indexOf( '.ts' ) > 0 ) {
                basename = path.basename( item, '.ts' );
            }

            if ( workflow === 'dev' ) {
                entrys[ basename ] = hot == true ? [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, 'webpack/hot/dev-server', item ] : [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, item ];
            }
            else if ( workflow === 'build' ) {
                entrys[ basename ] = item;
            }
        }
    } );

    return entrys;
};

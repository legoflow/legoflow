'use strict';

const path = require('path');
const glob = require('glob');

module.exports = ( type, { hot, entry, projectPath, ip, webpackPort } ) => {
    let files = entry || [ ];
    let entrys = [ ];

    if ( !entry ) {
        const jsFolderPath = path.resolve( projectPath, './src/js' );
        files = glob.sync( `${ jsFolderPath }/*.js` ) || [ ];
    }

    files.forEach( ( item, index ) => {
        const basename = path.basename( item );

        if ( item.indexOf( '_' ) !== 0 ) {
            if ( type === 'dev' ) {
                entrys[ basename ] = hot == true ? [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, 'webpack/hot/dev-server', item ] : [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, item ];
            }
            else if ( type === 'build' ) {
                entrys[ basename ] = item;
            }
        }
    } );

    return entrys;
};

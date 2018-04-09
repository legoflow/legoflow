'use strict';

const path = require('path');
const _ = require('lodash');

module.exports = ( what, _config_ ) => {
    let config = _.cloneDeep( _config_ );

    const { projectPath, root, env, user } = config;

    const defaultAlias  = {
        js: `${ projectPath }/src/js/`,
        '@user': `${ root }/node_modules_user/node_modules`,
        '@local': `${ projectPath }/node_modules`,
    };

    const nowENV = what === 'dev' ? ( config[ 'env.dev' ] || 'dev' ) : ( config[ 'env.build' ] || 'build' );

    if ( typeof env !== 'undefined' && typeof env[ nowENV ] !== 'undefined' ) {
        const __config__ = env[ nowENV ];

        for ( let key in __config__ ) {
            const value = __config__[ key ];

            if ( !config[ key ] || typeof config[ key ] !== 'object' ) {
                config[ key ] = value;
            }
            else {
                config[ key ] = _.assign( config[ key ], value );
            }
        }
    }

    // to absolute path
    for ( let item in config.alias ) {
        if ( config.alias[ item ].indexOf( './' ) === 0 ) {
            config.alias[ item ] = path.resolve( projectPath, config.alias[ item ] );
        }
    }

    // 用户自定义开发参数
    let args = {
        'process.env': `"${ what }"`,
        'process.config_env': `"${ nowENV }"`,
        'process.args': { },
    }

    const envUserArgs = config[ `user.args.${ what }` ];

    if ( typeof envUserArgs != 'undefined' ) {
        for ( let key in envUserArgs ) {
            if ( key === user || key !== '*' ) {
                args[ 'process.args' ] = _.assign( args[ 'process.args' ], envUserArgs[ key ] );
            }
        }
    }

    config.args = args;

    return config;
};

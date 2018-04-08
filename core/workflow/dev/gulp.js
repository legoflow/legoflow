'use strict';

const path = require('path');

const browserSync = require('browser-sync');
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const preprocess = require('gulp-preprocess');
const sassVariables = require('gulp-sass-variables');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const dist = require('gulp-dist');
const imgSize = require('gulp-image-size');
const filterStyleFile = require('gulp-filter-style-file');

const reload = browserSync.reload;

let config = void 0;

const toPromise = ( func ) => {
    return new Promise( ( resolve, reject ) => {
        func( resolve, reject )
    } );
}

/// ---------------------------------- browser ----------------------------------
const BROWSER_OPEN = ( resolve, reject ) => {
    const { system, port, autoOpenChrome, ip, webpackPort } = config;

    const browser = system === 'mac' ? 'google chrome' : 'chrome';

    let localPort = void 0;
    let bsHotFileUrl = '';

    const options = {
        https: false,
        ui: false,
        notify: false,
        ghostMode: false,
        port,
        open: 'external',
        browser,
        timestamps: true,
        proxy: {
            target: `http://${ ip }:${ webpackPort }`,
        },
        scriptPath ( path, port, options ) {
            localPort = port;

            bsHotFileUrl = `http://${ ip }:${ port }${ path.toString( ) }`;

            return '';
        },
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn ( snippet, match ) {
snippet = `
<script src="${ bsHotFileUrl }"><\/script>
<script src="https://s1.yy.com/ued_web_static/lib/lego/log/dev.js" async="async"><\/script>
<\/body>
`;
                    return snippet;
                }
            }
        },
    }

    if ( !autoOpenChrome ) {
        options.open = false;
    }

    console.log( options );

    browserSync( options, ( err, arg ) => {
        if ( err ) {
            console.error( 'browserOpen error: ' + err );

            return void 0;
        }

        resolve( );
    } )
}

// ---------------------------------- sass ----------------------------------
let sassSuccessFlag = true;

const sassErrorNotifier = ( msg ) => {
    sassSuccessFlag = true;

    console.log( 'Sass 编译错误 >> ', msg );

    // console.error( `Sass 编译错误: ${ msg.file.split( '/' ).pop( ) }文件 line${ msg.line } >> ${ msg.message.replace(/\"/g,'\'') }` );

    // notifier.notify({
    //     title: 'LegoFlow',
    //     message: `Sass编译错误: ${ msg.file.split( '/' ).pop( ) }文件 line${ msg.line }`,
    //     sound: true,
    // } );
}

const SASS_TASK = ( ) => {
    const { projectPath } = config;

    const sassPath = `${ projectPath }/src/sass/**/*.scss`;
    const distPath = `${ projectPath }/src/css/`;

    gulp.src( sassPath )
        .pipe( sassVariables( { $env: 'dev' } ) )
        .pipe( sourcemaps.init( ) )
        .pipe( filterStyleFile( ) )
        .pipe( sass( ).on( 'error', sassErrorNotifier ) )
        .pipe( autoprefixer({
                browsers: [ 'last 2 versions', 'Android >= 4.0' ],
                cascade: true,
                remove: false,
            } )
        )
        .pipe( sourcemaps.write( ) )
        .pipe( gulp.dest( distPath ) )
        .on( 'end', ( ) => {
            if ( typeof obj !== 'undefined' && sassSuccessFlag ) {
                let extname = '';
                let basename = '';

                try {
                    const name = parsePath( obj.relative );
                    extname = name.extname;
                    basename = name.basename;
                } catch ( e ) {
                    extname = '';
                    basename = '';
                }

                if ( basename !== '_img' && extname !== 'scss' ) {
                    console.info( 'Sass 编译成功' );

                    sassSuccessFlag = false;

                    // notifier.notify( {
                    //     title: 'LegoFlow',
                    //     message: 'Sass 编译成功',
                    //     sound: true,
                    // } );
                }
            }
        } )
        // .pipe( reload( { stream: true } ) )
}

// ---------------------------------- ejs ----------------------------------
const EJS_TASK = ( ) => {
    const { projectPath } = config;

    const ejsPath = path.resolve( projectPath, './src/ejs/*.ejs' );
    const htmlPath = path.resolve( projectPath, './src' );

    gulp.src( ejsPath )
        .pipe( ejs( ) )
        .on( 'error', ( e ) => {
            console.error( `[EJS ERROR]: ${ e.message }` );
        } )
        .pipe( rename( ( path ) => {
                path.extname = '.html';
            } )
        )
        .pipe( preprocess( {
                context: {
                env: 'dev',
                }
            } ).on( 'error', ( e ) => {
                console.error( error.toString( ) );
            } )
        )
        .pipe(
            dist( htmlPath, ( i ) => {
                console.log(`EJS 文件数 ${ i }`);
                // reload( projectPath + '/src/**/*.html' );
            } )
        )
}

module.exports = async ( _config_ ) => {
    console.log( '[DEV GULP]' );

    config = _config_;

    await imgSize( config );

    SASS_TASK( );

    await toPromise( BROWSER_OPEN );

    EJS_TASK( );
};

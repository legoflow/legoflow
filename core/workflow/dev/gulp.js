'use strict';

const path = require('path');

const fs = require('fs-extra');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const preprocess = require('gulp-preprocess');
const sassVariables = require('gulp-sass-variables');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const through = require('through2');

const dist = require('gulp-dist');
const imgSize = require('gulp-image-size');
const filterStyleFile = require('gulp-filter-style-file');
const watch = require('gulp-watch');

const reload = browserSync.reload;

let config = void 0;
let messager = void 0;

const toPromise = ( func ) => {
    return new Promise( ( resolve, reject ) => {
        func( resolve, reject )
    } );
}

const parsePath = ( p ) => {
    const extname = path.extname( p );

    return {
        dirname: path.dirname( p ),
        basename: path.basename( p, extname),
        extname,
    };
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

    browserSync( options, ( err, arg ) => {
        if ( err ) {
            console.error( 'browserOpen error: ' + err );

            return void 0;
        }

        resolve( );
    } )
}

// ---------------------------------- sass ----------------------------------
let sassCompileError = false;
let sassCompileSuccess = true;

const sassErrorNotifier = function ( msg ) {
    sassCompileError = true;

    console.log( 'Sass 编译错误 >> ', msg );

    messager.error( `Sass 编译错误: ${ msg.file.split( '/' ).pop( ) }文件 line${ msg.line } >> ${ msg.message.replace(/\"/g,'\'') }` );

    messager.notice( `Sass编译错误: ${ msg.file.split( '/' ).pop( ) }文件 line${ msg.line }` );

    this.emit( 'end' );
}

const SASS_TASK = ( files ) => {
    const { projectPath } = config;

    const sassPath = `${ projectPath }/src/sass/**/*.scss`;
    const distPath = `${ projectPath }/src/css/`;

    gulp.src( sassPath )
        .pipe( sassVariables( { $env: 'dev' } ) )
        .pipe( sourcemaps.init( ) )
        .pipe( filterStyleFile( ) )
        .pipe( sass( ).on( 'error', sassErrorNotifier ) )
        .pipe( through.obj( ( file, enc, cb ) => {
            sassCompileSuccess = true;

            cb( null, file );
        } ) )
        .pipe( autoprefixer({
                browsers: [ 'last 2 versions', 'Android >= 4.0' ],
                cascade: true,
                remove: false,
            } )
        )
        .pipe( sourcemaps.write( ) )
        .pipe( gulp.dest( distPath ) )
        .on( 'end', ( ) => {
            if ( typeof files !== 'undefined' && sassCompileSuccess && sassCompileError ) {
                let extname = '';
                let basename = '';

                try {
                    const { extname, basename } = parsePath( files.relative );
                } catch ( e ) { }

                if ( basename !== '_img' && extname !== 'scss' ) {
                    console.info( 'Sass 编译成功' );

                    sassCompileError = false;

                    messager.notice( 'Sass 编译成功' );
                }
            }
        } )
        .pipe( reload( { stream: true } ) )
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

// ---------------------------------- imgSass ----------------------------------
let imgSassTaskTimer = void 0;

const IMG_SASS_TASK = ( ) => {
    imgSassTaskTimer ? clearTimeout( imgSassTaskTimer ) : void 0;

    imgSassTaskTimer = setTimeout( async ( ) => {
        await imgSize( config );

        reload( { stream: true } );
    }, 500 )
}

module.exports = async ( _config_, _messager_ ) => {
    config = _config_;
    messager = _messager_;

    const { projectPath } = config;

    await imgSize( config );

    SASS_TASK( );

    watch( `${ projectPath }/src/sass/**/*.scss`, SASS_TASK );

    // 判断如果不是 ejs 编译出来的 html 才自动刷新
    gulp.watch( `${ projectPath }/src/*.html`, ( event ) => {
        const htmlPath = event.path.replace( /\\/g, '/' );
        const name = htmlPath.split( '/' ).pop( ).replace( '.html', '.ejs' );

        if ( fs.existsSync( `${ projectPath }/src/ejs/${ name }` ) ) {
            reload( htmlPath );
        }
    } );

    watch( `${ projectPath }/legoflow.*`, ( ) => {
        console.log( '配置修改后, 重启工作流后生效' );
    } );

    await toPromise( BROWSER_OPEN );

    EJS_TASK( );

    watch( `${ projectPath }/src/img/**`, IMG_SASS_TASK );

    gulp.watch( `${ projectPath }/src/ejs/**/*.ejs`, EJS_TASK );

    // 入口文件增加或删除提示重启加入webpack构建中
    watch( `${ projectPath }/src/js/*.js`, {
        events: [ 'add', 'unlink' ],
    }, ( result ) => {
        const name = result.basename;

        if ( name.indexOf( '.js' ) > 0 && name.indexOf( '_' ) !== 0 ){
            console.log( 'Entry 文件变动, 请重启工作流' );
        }
    } );
};

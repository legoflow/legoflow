'use strict';

const path = require('path');
const fs = require('fs-extra');
const del = require('del');
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const preprocess = require('gulp-preprocess');
const sassVariables = require('gulp-sass-variables');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const through = require('through2');
const cssBase64 = require('gulp-css-base64');
const cleanCSS = require('gulp-clean-css');
const header = require('gulp-header');
const concat = require('gulp-concat');
const spriter = require('gulp-spriter');
const imagemin = require('gulp-imagemin');
const inlinesource = require('gulp-inline-source');
const cssUrlVersion = require('gulp-make-css-url-version');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const htmlVersion = require('gulp-html-version');

const assets = require('gulp-assets');
const dist = require('gulp-dist');
const imgSize = require('gulp-image-size');
const filterStyleFile = require('gulp-filter-style-file');

let config = void 0;
let messager = void 0;
let projectPath = void 0;

const toPromise = ( func ) => {
    return new Promise( ( resolve, reject ) => {
        func( resolve, reject )
    } );
}

// ---------------------------------- move html ----------------------------------
const HTML_MOVE_TASK = ( resolve, reject ) => {
    gulp.src( `${ projectPath }/src/*.html` )
        .pipe (gulp.dest( `${ projectPath }/dist/` ) )
        .on( 'end', resolve );
}

// ---------------------------------- ejs ----------------------------------
const EJS_TASK = ( resolve, reject ) => {
    const { args } = config;

    gulp.src( `${ projectPath }/src/ejs/*.ejs` )
        .pipe( ejs( ) )
        .on( 'error', ( e ) => {
            console.error( e );

            messager.error( `EJS 编译错误: ${ e.message }` )
        } )
        .pipe( rename( ( path ) => {
                path.extname = '.html';
            } )
        )
        .pipe( preprocess( {
            context: {
                env: 'build',
                args: args[ 'process.args' ],
            }
        } )
        .on( 'error', ( error ) => {
            messager.error( error.toString( ) );
            } )
        )
        .pipe( gulp.dest( `${ projectPath }/dist/` ) )
        .on( 'end', ( ) => {
            messager.log( 'EJS 构建完成' );

            resolve( );
        } );
}

// ---------------------------------- sass ----------------------------------
const SASS_TASK = ( resolve, reject ) => {
    const { banner } = config;

    const dest = `${ projectPath }/dist/css`;

    gulp.src( `${ projectPath }/src/sass/**/*.scss` )
        .pipe( sassVariables( {
                $env: 'build',
            } )
        )
        .pipe( filterStyleFile( ) )
        .pipe( sass( ).on( 'error', ( e ) => {
                console.log( e );

                messager.error( `Sass编译错误: ${ msg.file.split( '/' ).pop( ) }文件 line${ msg.line } >> ${ msg.message.replace( /\"/g, '\'' ) }` );
            } )
        )
        .pipe( cssBase64( {
                baseDir: '../img/base64',
                maxWeightResource: 1024 * 1000,
                extensionsAllowed: [ '.png', '.jpg', 'gif', 'jpeg', 'svg' ],
            } )
        )
        .pipe( autoprefixer( {
                browsers: [ 'last 2 versions', 'Android >= 4.0' ],
                cascade: true,
                remove: false,
            } )
        )
        .pipe( cleanCSS( { compatibility: 'ie8' } ) )
        .pipe( header( banner || '' ))
        .pipe( gulp.dest( dest ) )
        .on( 'end', ( ) => {
            gulp.src( `${ dest }/**/*.css` )
                .pipe( concat( '_AllInOne_.css' ) )
                .pipe( gulp.dest( dest ) )
                .on( 'end', ( ) => {
                    messager.log( 'Sass 构建完成' );

                    resolve( );
                } );
        } );
};

// ---------------------------------- sprite ----------------------------------
const SPRITE_TASK = ( resolve, reject ) => {
    let slicePath = `${ projectPath }/src/img/slice`;
    let spliteFolder = [ ];
    let spliteBase = false;

    const buildSprite = ( splites, index ) => {
        if ( index + 1 <= splites.length ) {

            let spliteName = splites[ index ].name + '.png';
            let splitePath = splites[ index ].path;
            let inputPath  = splites[ index ].type === 'folder' ? `${ splites[ index ].name }/` : '';

            gulp.src( `${ projectPath }/dist/css/**/*.css` )
                .pipe( spriter( {
                        sprite: spliteName,
                        slice: splitePath,
                        outpath: `${ projectPath }/dist/.img/`,
                        inputPath: `../img/slice/${ inputPath }`,
                        cssImgPrefixPath: '../img/',
                        cssUnit: config.REM ? 'rem' : 'px',
                        allCss: `${ projectPath }/dist/css/_AllInOne_.css`,
                    } )
                )
                .pipe( gulp.dest( `${ projectPath }/dist/css/` ) )
                .on( 'end', ( ) => buildSprite( splites, ++index ) );
        }
        else {
            messager.log( '雪碧图 构建完成' );

            resolve( );
        }
    }

    let makeSlice = ( ) => {
        const files = fs.readdirSync( slicePath );

        if ( files.length > 0 ) {
            files.forEach( ( file, index ) => {
                let filePath = `${ slicePath }/${ file }`;

                const stat = fs.statSync( filePath );

                if ( stat.isDirectory( ) ) {
                    spliteFolder.push( {
                        name: file,
                        path: filePath,
                        type: 'folder',
                    } );
                }
                else if ( stat.isFile && file.indexOf( '.png' ) > 0 ) {
                    spliteBase = true;
                }

                if ( index + 1 === files.length ) {
                    if ( spliteBase ) {
                        spliteFolder.push( {
                            name: 'sprite',
                            path: slicePath.replace( /\\/g, '/' ),
                            type: 'file',
                        } );
                    }

                    buildSprite( spliteFolder, 0 );
                }
            } )
        }
        else {
            resolve( );
        }
    }

    fs.stat( slicePath, ( err, stat ) => {
        if ( err && err.code == 'ENOENT' ) {
            console.log( '雪碧图路径不存在' );

            resolve( );
        }
        else if ( err == null ) {
            makeSlice( );
        }
    } )
}

// ---------------------------------- img ----------------------------------
const IMG_TASK = ( resolve, reject ) => {
    const copyOtherTypeImg = ( resolve, reject ) => {
        gulp.src( [ `${ projectPath }/dist/.img/**/*.gif`, `${ projectPath }/dist/.img/**/*.svg` ] )
            .pipe( gulp.dest( `${ projectPath }/dist/img/` ) )
            .on( 'end', resolve );
    }

    const minImg = ( ) => {
        gulp.src( [ `${ projectPath }/dist/.img/**/*.png`, `${ projectPath }/dist/.img/**/*.jpg`, `${ projectPath }/dist/.img/**/*.JPG` ] )
            .pipe( imagemin( {
                    progressive: true,
                } )
            )
            .pipe( gulp.dest( `${ projectPath }/dist/img/` ) )
            .on( 'end', ( ) => {
                del.sync( [ `${ projectPath }/dist/.img` ], { force: true } );
                del.sync( [ `${ projectPath }/dist/css/_AllInOne_.css` ], { force: true } );

                messager.log( '图片压缩完成' );

                resolve( );
            } );
    }

    gulp.src( `${ projectPath }/src/img/**` )
        .pipe( gulp.dest( `${ projectPath }/dist/.img/` ) )
        .on( 'end', async ( ) => {
            del.sync( [ `${ projectPath }/dist/.img/base64`], { force: true } );
            del.sync( [ `${ projectPath }/dist/.img/slice`], { force: true } );

            await toPromise( copyOtherTypeImg );

            minImg( );
        } );
}

// ---------------------------------- inline ----------------------------------
const INLINE_TASK = ( resolve, reject ) => {
    gulp.src( `${ projectPath }/dist/*.html` )
        .pipe( preprocess({
                context: {
                    env: 'build',
                }
            } )
            .on( 'error', ( e ) => {
                console.error( e.toString( ) );
            } )
        )
        .pipe( inlinesource( ) )
        .pipe( gulp.dest( `${ projectPath }/dist` ) )
        .on( 'end', ( ) => {
            messager.log( 'HTML 内联成功' );

            resolve( );
        } );
}

// ---------------------------------- css version ----------------------------------
const CSS_VERSION = ( resolve, reject ) => {
    const { cache } = config[ 'workflow.build' ];

    gulp.src( `${ projectPath }/dist/css/**/*.css` )
        .pipe( cssUrlVersion( {
                paramType: cache || '',
                version: config.version || '',
            } )
        )
        .pipe( gulp.dest( `${ projectPath }/dist/css/` ) )
        .on( 'end', resolve );
}

// ---------------------------------- move assets ----------------------------------
const MOVE_ASSETS = ( resolve, reject ) => {
    const assetsPath = `${ projectPath }/src/assets/`;

    if ( !fs.existsSync( assetsPath ) ) {
        resolve( );
    }

    gulp.src( `${ assetsPath }/**/*` )
        .pipe( gulp.dest( `${ projectPath }/dist/assets` ) )
        .on( 'end', ( ) => {
            messager.log( 'assets 文件夹移动成功' );

            resolve( );
        } );
}

// ---------------------------------- html ----------------------------------
const HTML_TASK = ( resolve, reject ) => {
    const { banner } = config;

    const resourcesDomain = config[ 'workflow.build' ][ 'html.resourcesDomain' ];

    const { cache } = config[ 'workflow.build' ];

    gulp.src( `${ projectPath }/dist/*.html` )
        .pipe( useref( ) )
        .pipe( gulpif( '*.js', header( banner ) ) )
        .pipe( gulpif( '*.css', header( banner ) ) )
        .pipe( htmlVersion({
                paramType: cache,
                version: config.version,
                suffix: [ 'css', 'js', 'jpg', 'png', 'gif' ],
            } )
        )
        .pipe( assets( resourcesDomain || '' ) )
        .pipe( gulp.dest( `${ projectPath }/dist` ) )
        .on( 'end', resolve )
}

// ---------------------------------- tousle ----------------------------------
const TOUSLE_TASK = ( resolve, reject ) => {
    const moveJsCss = ( ) => {
        gulp.src( `${ projectPath }/dist/js/**/*.css` )
            .pipe( gulp.dest( `${ projectPath }/dist/css/` ) )
            .on( 'end', ( ) => {
                del.sync( [ `${ projectPath }/dist/js/**/*.css` ], { force: true } );

                resolve( );
            } );
    }

    moveJsCss( );
}

module.exports = async ( _config_, _messager_ ) => {
    config = _config_;
    messager = _messager_;

    projectPath = config.projectPath;

    await imgSize( config );

    await toPromise( HTML_MOVE_TASK );

    await toPromise( EJS_TASK );

    await toPromise( SASS_TASK );

    await toPromise( SPRITE_TASK );

    await toPromise( IMG_TASK );

    await toPromise( INLINE_TASK );

    await toPromise( CSS_VERSION );

    await toPromise( MOVE_ASSETS );

    await toPromise( HTML_TASK );

    await toPromise( TOUSLE_TASK );
}

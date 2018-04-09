'use strict';

let glob = require('glob');
let sizeOf = require('image-size');
let fs = require('fs');

const imageSizeSass = ( config, resolve ) => {

	const { projectPath, REM, env } = config;

	let imgSizescss = ``;
	let path = projectPath + '/src/img/**';

	let files = glob.sync(path, {
		nodir: true
	});

	let filesLength  = files.length;
	let readFilesNum = 0;

	const calllback = ( ) => {
		if(readFilesNum === filesLength){

			fs.stat( projectPath + '/src/sass/', (err, stat) => {
				if(err && err.code == 'ENOENT'){
					console.error('自动生成图片信息 Sass 文件路径不存在');
					if(resolve){
						resolve();
					}
				}else if(err == null){
					fs.writeFile( projectPath + '/src/sass/_img.scss', imgSizescss, (err) => {
						if(err) throw err;
						if(resolve){
							resolve();
						}
					});
				}
			})
		}
	}

	if(filesLength > 0){
		files.forEach((item) => {
			const suffix = item.split('.').pop();
			const name = require('path').basename( item );

			if(
				['png', 'jpg', 'jpeg', 'gif'].indexOf(suffix) < 0 ||
				name.indexOf('@') >= 0
			){
				++readFilesNum;
				calllback();
			}else {
				sizeOf(item, (err, dimensions) => {
					if(err) throw err;

	let name = item.split( projectPath ).pop().split('/img/').pop();

	let width, height;

	if( REM == true ){
		width  = dimensions.width  / 100 + 'rem';
		height = dimensions.height / 100 + 'rem';
	}
	else{
		width  = dimensions.width + 'px';
		height = dimensions.height + 'px';
	}

let otherStyle =
`	background-size: contain;
	background-repeat: no-repeat;`;

if(item.indexOf('/img/slice/') > 0){
	if( env === 'build'){
		otherStyle = '	background-repeat: no-repeat;';
	}
}

let thisImgScss =
`// -----------------------------------------------
%${ name.replace(/\\/g, '/').split('/').pop().replace(/(\.png|\.jpg|\.gif|\.jpeg|)/g, '') } {
	width: ${ width };
	height: ${ height };
	background-image: url('../img/${ name }');
${ otherStyle }
}
%${ name.replace(/(\\|\/)/g, '-') } {
	width: ${ width };
	height: ${ height };
	background-image: url('../img/${ name }');
${ otherStyle }
}
// -----------------------------------------------
`
				imgSizescss = imgSizescss + thisImgScss;
				++readFilesNum;
				calllback();
			});
			}
		})
	} else {
		fs.stat( projectPath + '/src/sass', (err, stat) => {
			// 路径不存在
			if(err && err.code == 'ENOENT'){
				resolve();
			}
			else if(err == null || stat.isDirectory()){
				fs.writeFile( projectPath + '/src/sass/_img.scss', '', (err) => {
					if(err) throw err;
					if(resolve){
						resolve();
					}
				});
			}
		})
	}

};

module.exports = ( config ) => {
	return new Promise( ( resolve, reject ) => {
		imageSizeSass( config, resolve );
	} );
};

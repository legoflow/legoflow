'use strict';

let through = require('through2');

const PLUGIN_NAME = 'gulp-filter-style-file';

let gulpFilterStyleFile = (opt) => {

    return through.obj((file, enc, cb) => {

        if(file.isBuffer()){
            let fileName = file.path.replace(/\\/g, '/').split('/').pop();
			if(fileName.indexOf('_') === 0){
				cb();
				return;
			}
        }

        cb(null, file);
		return;

    });

};

module.exports = gulpFilterStyleFile;

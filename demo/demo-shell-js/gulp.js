'use strict';

const gulp = require('gulp');

gulp.src('./dist/css/*.css')
    .pipe(gulp.dest('./dist/copy_css'))


'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var gutil       = require('gulp-util');
var inject      = require('gulp-inject');
var gulpif      = require('gulp-if');
var minifyHtml  = require('gulp-minify-html');
var merge       = require('merge-stream');


// copies root .html files (those not used by angular) to /dist
module.exports = function(){
  gulp.task('copy-html', function() {
    return gulp.src(['src/*.html', '!src/index.html'])
      .pipe(gulpif(gutil.env.production, minifyHtml()))
      .pipe(gulp.dest('dist/'))
      .pipe(connect.reload());
  });

};

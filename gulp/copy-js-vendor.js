'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var merge       = require('merge-stream');
var cached      = require('gulp-cached');
var bowerFiles  = require('main-bower-files');

// copies bower main javascript files to /dist
module.exports = function(){
  gulp.task('copy-js-vendor', function() {
    return gulp.src(bowerFiles('**/*.js', {includeDev: true}), {base: 'bower_components'})
      .pipe(cached())
      .pipe(gulp.dest('dist/vendor'))
      .pipe(connect.reload());
  });
};

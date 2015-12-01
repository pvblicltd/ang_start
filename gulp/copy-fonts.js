'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
var bowerFiles  = require('main-bower-files');

// copies all main fonts to /dist
module.exports = function(){
  gulp.task('copy-fonts', function() {
    return gulp.src(bowerFiles('**/*.{otf,eot,svg,ttf,woff,woff2}'))
      .pipe(gulp.dest('dist/fonts'))
      .pipe(connect.reload());
  });

};

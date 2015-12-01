'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var merge       = require('merge-stream');
var cached      = require('gulp-cached');
var plumber     = require('gulp-plumber');

// copies angular app and dependencies to /dist
module.exports = function(){
  gulp.task('copy-js-app', function() {
    return gulp.src([
      'src/**/*.js',
      '!src/**/*.spec.js',
      '!src/**/*.prot.js',
      '!**/*.page.js'
    ])
      .pipe(plumber())
      .pipe(cached('js'))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });

};

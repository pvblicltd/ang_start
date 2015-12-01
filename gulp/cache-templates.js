'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var inject      = require('gulp-inject');
var bowerFiles  = require('main-bower-files');
var minifyHtml  = require('gulp-minify-html');
var merge       = require('merge-stream');
var plumber     = require('gulp-plumber');
var ngcache     = require('gulp-angular-templatecache');
var ngApp       = 'cpp-ui-spa-master';

// caches html files to $templateCache
// copies to /dist
module.exports = function(){
  gulp.task('cache-templates', function() {
    return merge(
      gulp.src('src/app/**/*.html'),
      gulp.src(bowerFiles('**/*.html'))
    )
      .pipe(plumber())
      .pipe(minifyHtml()) // used in development to catch angular expression errors
      .pipe(ngcache('templates.js', {module: ngApp}))
      .pipe(gulp.dest('./dist/app'))
      .pipe(connect.reload());
  });
};

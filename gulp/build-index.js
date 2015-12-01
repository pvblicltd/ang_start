'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var ngFilesort  = require('gulp-angular-filesort');
var gutil       = require('gulp-util');
var inject      = require('gulp-inject');
var bowerFiles  = require('main-bower-files');
var gulpif      = require('gulp-if');
var minifyHtml  = require('gulp-minify-html');
var merge       = require('merge-stream');
var plumber     = require('gulp-plumber');

// injects links for js/css files into dist/index.html
module.exports = function(){
  gulp.task('build-index', function() {
    var app, dist = {read: false, cwd: 'dist'};
    if(gutil.env.production) {
      app = gulp.src('**/app*.*', dist);
    } else {
      app = merge(
        gulp.src('**/app*.css', dist),
        gulp.src(['app/**/*.js', 'common/**/*.js'], {cwd: 'dist'})
          .pipe(plumber())
          .pipe(ngFilesort())
      );
    }
    return gulp.src('src/index.html')
      // [production, development] vendor styles
      .pipe(inject(
        gulp.src('**/vendor*.css', dist), {
          addRootSlash: false,
          name:        'vendor'
        }
      ))
      // [development] vendor scripts - references bowerFiles() in order to establish file order
      .pipe(gulpif(!gutil.env.production, inject(
        gulp.src(bowerFiles('**/*.js'), {read: false, cwd: 'bower_components'}), {
          addRootSlash: false,
          name:        'vendor',
          addPrefix:   'vendor'
        }
      )))
      // [production] vendor scripts
      .pipe(gulpif(gutil.env.production, inject(
        gulp.src('scripts/vendor*.js', dist), {
          name: 'vendor',
          addRootSlash: false
        }
      )))
      // [development, production] app scripts/styles
      .pipe(inject(
        app, {
          name: 'app',
          addRootSlash: false
        }
      ))
      // [production] config.js - a timestamp revision is appended to cache bust
      .pipe(gulpif(gutil.env.production, inject(
        gulp.src('**/*.config.js', dist), {
          name: 'config',
          addRootSlash: false,
          transform: function(filepath) {
            var now = new Date().getTime();
            return '<script src="' + filepath + '?v=' + now + '"></script>';
          }
        }
      )))
      .pipe(gulpif(gutil.env.production, minifyHtml({conditionals: true})))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
  });
};

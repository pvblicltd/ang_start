'use strict';

var gulp          = require('gulp');
var bowerFiles    = require('main-bower-files');
var concat        = require('gulp-concat');
var inject        = require('gulp-inject');
var rename        = require('gulp-rename');
var series        = require('stream-series');

// injects application and spec files into karma.conf.js
// copies to .karma.conf.js

module.exports = function(){
  gulp.task('build-karma', function() {
    var files = series(
      gulp.src(bowerFiles('**/*.js', {includeDev: true, read: false})),
      gulp.src([
        'src/app/**/*.js',
        'src/**/*.html',
        '!src/app/app.bootstrap.js'
      ])
    );
    return gulp.src('karma.conf.js')
      .pipe(inject(files, {
        addRootSlash: false,
        starttag:     'files: [',
        endtag:       ']',
        transform: function (filepath, file, i, length) {
          return ' \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
        }
      }))
      .pipe(rename({basename: '.karma.conf'}))
      .pipe(gulp.dest('./'));
  });
};

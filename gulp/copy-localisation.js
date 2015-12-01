'use strict';

var gulp      = require('gulp');
var rev       = require('gulp-rev');
var rename    = require('gulp-rename');

// copies lang files into languages
module.exports = function(){
  gulp.task('copy-localisation', function() {
    return gulp.src('src/app/**/*.lang.json')
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest('dist/languages'));
  });
};


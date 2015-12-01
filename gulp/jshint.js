'use strict';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

// lints javascript
module.exports = function(){
  gulp.task('jshint', function() {
    return gulp.src('src/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

};

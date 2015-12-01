'use strict';

var gulp = require('gulp');
var rename      = require('gulp-rename');

// renames all bower .css to .less
// (required due to less being unable to import .css files)
module.exports = function(){
  gulp.task('rename-css-vendor', function() {
    return gulp.src('bower_components/**/*.css')
      .pipe(rename({prefix: '_', extname: '.less'}))
      .pipe(gulp.dest('bower_components'));
  });

};

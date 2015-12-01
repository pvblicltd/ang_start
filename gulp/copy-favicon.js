'use strict';

var gulp = require('gulp');

// copies favicon to /dist
module.exports = function(){
  gulp.task('copy-favicon', function() {
    return gulp.src('src/favicon.ico')
      .pipe(gulp.dest('dist'));
  });

};

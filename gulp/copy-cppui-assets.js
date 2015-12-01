'use strict';

var gulp = require('gulp');

// copies cpp-ui assets
module.exports = function(){
  gulp.task('copy-cppui-assets', function() {
    return gulp.src('bower_components/cpp-ui/dist/assets/**/*')
      .pipe(gulp.dest('dist/assets'));
  });
};

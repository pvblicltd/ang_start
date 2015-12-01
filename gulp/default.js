'use strict';

var gulp      = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');

// main gulp command
// run gulp for development build
// run gulp --production for production build
module.exports = function(){
  gulp.task('default', function(cb) {
    if(gutil.env.production) {
      runSequence('jshint', 'build', cb);
    } else {
      runSequence(['jshint', 'build'], 'serve', 'watch', cb);
    }
  });


};

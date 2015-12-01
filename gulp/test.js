'use strict';

var gulp      = require('gulp');
var runSequence = require('run-sequence');

// execute tests
module.exports = function(){
  gulp.task('test', function() {
    runSequence('build-karma', 'karma', 'clean-test');
  });
};


'use strict';

var gulp  = require('gulp');
var karma = require('karma');

// run karma unit tests
module.exports = function(){
  gulp.task('karma', function(done) {
    karma.server.start({
      configFile: '.karma.conf.js',
      singleRun:  true
    }, function() {
      done();
    });
  });

};

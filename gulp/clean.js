'use strict';

var del         = require('del');
var gulp        = require('gulp');

module.exports = function(cb){
// remove the /dist folder
  gulp.task('clean', function(cb) {
    del(['dist'], cb);
  });

};

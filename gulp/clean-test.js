'use strict';

var gulp        = require('gulp');
var del         = require('del');

// remove the temporary karma.conf.js file used in gulp test
module.exports = function(productionJs){
  gulp.task('clean-test', function(cb) {
    del(['.karma.conf.js'], cb);
  });

};

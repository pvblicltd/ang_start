'use strict';

var gulp      = require('gulp');
var runSequence = require('run-sequence');

// watch files for changes and invokes respective tasks
module.exports = function(){
  gulp.task('watch', function() {
    gulp.watch('bower.json',  function() { runSequence(['copy-js-vendor', 'copy-fonts', 'copy-images'], 'build-index'); });
    gulp.watch([
      'src/**/*.js',
      '!src/**/*.spec.js',
      '!src/**/*.prot.js',
      '!src/**/*.page.js'
    ], function() { runSequence('copy-js-app', 'build-index', 'jshint'); });
    gulp.watch('src/app/**/*.html', function() { runSequence('cache-templates', 'build-index'); });
    gulp.watch([
      'src/**/*.less',
      '!src/styles/vendor.less'
    ], ['build-css-app']);
    gulp.watch([
      'src/styles/vendor.less'
    ], ['build-css-vendor']);
    gulp.watch('src/images/**', ['copy-images']);
    gulp.watch(['src/index.html'], ['build-index']);
  });

};

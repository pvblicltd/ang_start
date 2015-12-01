'use strict';

var gulp    = require('gulp');
var connect = require('gulp-connect');
var open    = require('open');

// starts development server
// [development] starts livereload and opens browser
module.exports = function(){
  gulp.task('serve', function() {
    var port = 9009,
      host = '127.0.0.1';

    connect.server({
      port:       port,
      root:      'dist',
      hostname:   host,
      livereload: true
    });
    open('http://' + host + ':' + port);
  });

};

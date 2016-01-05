'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

// lints javascript
module.exports = function (config, log) {
    gulp.task('jshint', function () {
        return gulp.src(config.allAppJs)
          .pipe($.arialinter({
              level: 'AA'
          }))
          .pipe($.jshint())
          .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
    });
};

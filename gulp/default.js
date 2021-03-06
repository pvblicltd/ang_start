'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {

    gulp.task('default', function (cb) {
        if ($.util.env.production) { //production build
            runSequence('jshint', 'build', cb);
        }
        else { //development build
            //runSequence(['jshint', 'build'], 'serve', 'watch', cb);
            runSequence(['jshint', 'build'], 'serve-dev', 'watch', cb);
        }
    });
};

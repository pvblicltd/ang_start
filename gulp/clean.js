'use strict';

var del  = require('del');
var gulp = require('gulp');

module.exports = function(config, log){

    // remove the /dist folder
    gulp.task('clean-dist', function (done) {
        var files = [].concat(config.build_dir)
        clean(files, done);
    });

    // remove the /mock/raml folder
    gulp.task('clean-raml', function (done) {
        var files = [].concat(config.raml)
        clean(files, done);
    });

    // this is used by deployment builds
    gulp.task('clean-config', function (done) {
        del(['dist/**/config.module.js'], done);
    });

    function clean(path, done) {
        log('Cleaning: ' + path);
        del(path, done);
    }
};


'use strict';

var gulp = require('gulp'),
    del = require('del'),
    $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {

    gulp.task('get-raml', ['clean-raml'], processRaml);    

    function processRaml() {

        log('Processing all contextual Raml files');

        var sourcePaths = [].concat(
            'cppapi/dpp/cst/**/*',
            '!cppapi/dpp/cst/traits{,/**}',

            'cppapi/ocp/cst/**/*',
            '!cppapi/ocp/cst/traits{,/**}',
            
            'cppapi/pcc/cst/**/*',
            '!cppapi/pcc/cst/traits{,/**}',

            'cppapi/scheduling/cst/**/*',
            '!cppapi/scheduling/cst/traits{,/**}',

            'cppapi/structure/cst/**/*',
            '!cppapi/structure/cst/traits{,/**}'
        );

        return gulp
            .src(sourcePaths)
            .pipe(gulp.dest(config.raml));
    }
}
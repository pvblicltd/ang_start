'use strict';

var gulp = require('gulp'),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    profile = require(process.cwd() + '/profile.js')(),
    $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {

    gulp.task('git-cppapi', getApiRepo);
    gulp.task('get-raml', ['clean-raml'], processRaml);

    function getApiRepo() {

        if (profile.hasMissingData()) {

            log('Please complete your git access data in the profile.js file...');
            return;
        }

        var url = 'ssh://' + profile.data.username + '@coderepo.dev2.cloud.local:29418/cppapi';

        if (!fs.existsSync(path.join(process.cwd(), '/cppapi2'))) {

            $.git.clone(url, { args: './cppapi2' }, function (err) {
                if (err) throw err;
            });
        }
    }

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
};
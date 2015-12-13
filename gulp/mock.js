'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')({ lazy: true });

module.exports = function (config, log) {
    var port = process.env.PORT || config.defaultPort;

    gulp.task('start-mocks', function () {
        var nodeOptions = {
            script: config.ramlServer, // path to server.js
            env: {
                'PORT': port
            },
            watch: [config.serverFiles]
        };

        return $.nodemon(nodeOptions)
            .on('restart', function (ev) {
                log('*** nodemon restarted');
                log('files changed on restart:\n' + ev);

                setTimeout(function () { // reload browser-sync after server delay
                    browserSync.notify('reloading now...');
                    browserSync.reload({ stream: false });
                }, config.browserReloadDelay);
            })
            .on('crash', function () {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                log('*** nodemon existed cleanly');
            });
    });
};
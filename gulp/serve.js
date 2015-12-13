'use strict';

var gulp = require('gulp'),
    open = require('open'),
    browserSync = require('browser-sync'),
    proxyMiddleware = require('http-proxy-middleware'),
    $ = require('gulp-load-plugins')({ lazy: true });

// starts development server
// [development] starts livereload and opens browser
module.exports = function (config, log) {
    gulp.task('serve', function () {
        var port = 9009,
          host = '127.0.0.1';

        $.connect.server({
            port: port,
            root: 'dist',
            hostname: host,
            livereload: true
        });
        open('http://' + host + ':' + port);
    });


    // Runs browser-sync on port 9009 and a raml server on port 8888
    gulp.task('serve-dev', ['start-mocks'], function () {

        // Point to local raml mocks
        var proxy = [
            proxyMiddleware('api', {
                target: 'http://localhost:' + 9009,
                changeOrigin: true
            })
        ];

        startBrowserSync(
            config.serve.dev.root,
            config.serve.dev.routes,
            config.serve.dev.index,
            proxy,
            true
        );
    });

    // gulp.task('serve:dist', ['start-mocks'], function () {}) // TODO
    // gulp.task('serve:prod', function () {} ) // TODO

    function startBrowserSync(baseDir, routes, index, proxy, ghostModeEnabled) {

        if (browserSync.active) {
            return;
        }

        log('Starting browser-sync');

        var options = {
            port: 9009,
            files: [
                config.src + '**/*.*'
            ],
            server: {
                baseDir: baseDir,
                routes: routes,
                index: index,
                middleware: proxy
            },
            ghostMode: { // options to track when multiple browser are open
                clicks: ghostModeEnabled,
                location: false,
                forms: ghostModeEnabled,
                scroll: ghostModeEnabled
            },
            open: 'local',
            injectChanges: true, // default is true and injects just the file that change,
            logFileChanges: true, // log and reload only the changed file(a)
            logLevel: 'debug', // i.e info, debug, silent
            logPrefix: 'cpp-ui-spa-master', // referencing app
            notify: 'true', // indicate browser when ready
            reloadDelay: 0 // 1000 // time lapse between reload
        };

        browserSync(options);
    }
};

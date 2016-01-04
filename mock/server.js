'use strict';

var app = require('express')(),
    //errorHandler = require('./utils/error-handler.js')(),
    config = require('../gulp.config.js')(),
    fs = require('fs'),
    logger = require('morgan'),
    path = require('path'),
    port = process.env.PORT || 8888,
    ramlServer = require('raml-mocker-server');


var options = {
    app: app,
    debug: true,
    port: port,
    path: config.raml,
    watch: true,
    prioritizeBy: 'example'
};

// returns created server
var server = ramlServer(options, callback);

function callback(app) {

    app.use(logger('dev'));
    //app.use(errorHandler.init);

    app.listen(options.port, function () {
        console.log('The CJS Contextual Raml-Mock express server is listening on port ' + port);
    });
}


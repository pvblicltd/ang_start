'use strict';

var app = require('express')(),
    //errorHandler = require('./utils/error-handler.js')(),
    config = require('../gulp.config.js')(),
    fs = require('fs'),
    host = 'http://localhost:' || '', // TODO: make dynamic
    logger = require('morgan'),
    path = require('path'),
    ramlServer = require('raml-mocker-server');


var options = {
    app: app,
    debug: true,
    port: config.defaultPort,
    path: config.raml,
    watch: true,
    prioritizeBy:'example'
}

// returns created server
var server = ramlServer(options, callback);

function callback (app) {

    app.use(logger('dev'));
    //app.use(errorHandler.init);

    app.listen(options.port, function () {
        console.log('The CJS Contextual Raml mock server is running at ' + host + options.port);
    });
};


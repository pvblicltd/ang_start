'use strict';

var app = require('express')(),
    errorHandler = require('./utils/error-handler.js')(),
    fs = require('fs'),
    host = 'http://localhost:' || '', // TODO: make dynamic
    logger = require('morgan'),
    path = require('path'),
    ramlServer = require('raml-mocker-server');


//app.use(logger('dev'));
//app.use(errorHandler.init);

var options = {
    debug: true,
    port: 8888,
    path: './mock/raml',
    watch: true,
    prioritizeBy:'example'
}

// load all endpoints
require('./endpoints/hearing')(app, ramlServer, options);

app.listen(config.scheduling.port, function () {
    console.log('The CSSAPI Raml mock server is running at ' + host + config.scheduling.port);
});
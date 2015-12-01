'use strict';

var rev       = require('gulp-rev');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var lazypipe  = require('lazypipe');

module.exports = function(){
  lazypipe()
    .pipe(rev)
    .pipe(uglify)
    .pipe(rename, {extname: '.min.js'});
};


'use strict';

var lazypipe    = require('lazypipe');
var minifyCss   = require('gulp-minify-css');
var autoprefix  = require('gulp-autoprefixer');
var rev         = require('gulp-rev');
var rename      = require('gulp-rename');

module.exports = function(){
   lazypipe()
    .pipe(autoprefix)
    .pipe(minifyCss)
    .pipe(rev)
    .pipe(rename, {extname: '.min.css'});

};


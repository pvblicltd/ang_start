'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')({ lazy: true });

// copies lang files into languages
module.exports = function(config, log){
  gulp.task('copy-localisation', function() {
    return gulp.src(config.allLangualgesFiles)
      .pipe($.rename({dirname: ''}))
      .pipe(gulp.dest(config.distLanguages));
  });
};


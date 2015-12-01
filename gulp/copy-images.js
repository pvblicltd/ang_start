'use strict';

var gulp        = require('gulp');
var connect     = require('gulp-connect');
var merge       = require('merge-stream');
var bowerFiles  = require('main-bower-files');
var cached      = require('gulp-cached');

// minifies images in production builds
// copies images to /dist
module.exports = function(){
  gulp.task('copy-images', function() {
    return merge(
      gulp.src('src/images/**'),
      gulp.src(bowerFiles('**/*.{png,jpg,jpeg,gif}'))
    )
      .pipe(cached('images'))
//    .pipe(gulpif(gutil.env.production, imagemin()))
      .pipe(gulp.dest('dist/images'))
      .pipe(connect.reload());
  });
};

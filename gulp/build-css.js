'use strict';

var gulp            = require('gulp');
var lazypipe        = require('lazypipe');
var $               = require('gulp-load-plugins')({ lazy: true });

// compiles .less to .css
// [production] auto-prefixes, appends revision and compresses
// copies .css to /dist
var productionCss = lazypipe()
  .pipe($.autoprefixer)
  .pipe($.minifyCss)
  .pipe($.rev)
  .pipe($.rename, {extname: '.min.css'});

module.exports = function(){


  //gulp.task('build-css-app', function() {
  //  var stream = gulp.src('src/assets/styles/app.less')
  //    .pipe($.less())
  //    .pipe($.if($.util.env.production,
  //      stream = stream.pipe(productionCss());
  //    }
  //  );
  //  return stream
  //    .pipe(gulp.dest('dist/styles'))
  //    .pipe($.connect.reload());
  //});

  gulp.task('build-css-app', function() {
      return
        gulp
          .src('src/assets/styles/app.less')
          .pipe($.less())
          .pipe($.if($.util.env.production,productionCss()))
          .pipe(gulp.dest('dist/styles'))
          .pipe($.connect.reload());
      }
  );

  gulp.task('build-css-vendor', ['rename-css-vendor'], function() {
    var stream = gulp.src('src/assets/styles/vendor.less')
      .pipe($.less());

    if($.util.env.production) {
      stream = stream
        .pipe(productionCss());
    }
    return stream
      .pipe(gulp.dest('dist/styles'))
      .pipe($.connect.reload());
  });
};

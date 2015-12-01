'use strict';

var gulp          = require('gulp');
var bowerFiles    = require('main-bower-files');
var merge         = require('merge-stream');
var $             = require('gulp-load-plugins')({ lazy: true });
var lazypipe      = require('lazypipe');
var ngApp         = 'cpp-ui-spa-master';

// annotates angular dependency injections
// catches templates
// wraps concatenated angular modules in IIFE
// [production] appends revision and compresses
// copies to /dist
module.exports = function(){
  gulp.task('build-js-app', function() {
    return merge(
      gulp.src([
        'app/**/*.js',
        'common/**/*.js',
        '!app/config/*.js',
        '!**/*.spec.js',
        '!**/*.prot.js',
        '!**/*.page.js'
      ], {cwd: 'src'}),
      merge(
        gulp.src('src/app/**/*.html'),
        gulp.src(bowerFiles('**/*.html'))
      )
        .pipe($.minifyHtml())
        .pipe($.angularTemplatecache('templates.js', {module: ngApp}))
    )
      .pipe($.angularFilesort())
      .pipe($.ngAnnotate({single_quotes: true}))
      .pipe($.concat('app.js'))
      .pipe($.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n'))
      .pipe($.wrap("(function(angular) {\n\n'use strict';\n<%= contents %>\n\n})(window.angular);"))
      .pipe(productionJs())
      .pipe(gulp.dest('dist/scripts'));
  });

  gulp.task('build-js-vendor', function() {
    return gulp.src(bowerFiles('**/*.js'))
      .pipe($.concat('vendor.js'))
      .pipe(productionJs())
      .pipe(gulp.dest('dist/scripts'));
  });
};

var productionJs = lazypipe()
  .pipe($.rev)
  .pipe($.uglify)
  .pipe($.rename, {extname: '.min.js'});


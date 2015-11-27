/* jshint ignore:start */

'use strict';

var del         = require('del');
var gulp        = require('gulp');
var ngcache     = require('gulp-angular-templatecache');
var ngFilesort  = require('gulp-angular-filesort');
var autoprefix  = require('gulp-autoprefixer');
var cached      = require('gulp-cached');
var clone       = require('gulp-clone');
var concat      = require('gulp-concat');
var connect     = require('gulp-connect');
var gulpif      = require('gulp-if');
var jshint      = require('gulp-jshint');
var inject      = require('gulp-inject');
var minifyCss   = require('gulp-minify-css');
var minifyHtml  = require('gulp-minify-html');
var ngAnnotate  = require('gulp-ng-annotate');
var plumber     = require('gulp-plumber');
var rename      = require('gulp-rename');
var replace     = require('gulp-replace');
var rev         = require('gulp-rev');
var less        = require('gulp-less');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var wrap        = require('gulp-wrap');
var stylish     = require('jshint-stylish');
var karma       = require('karma');
var lazypipe    = require('lazypipe');
var bowerFiles  = require('main-bower-files');
var merge       = require('merge-stream');
var open        = require('open');
var runSequence = require('run-sequence');
var series      = require('stream-series');
var through     = require('through2');

// variables

var ngApp = 'cpp-ui-spa-master';

// reusable pipelines

var productionCss = lazypipe()
  .pipe(autoprefix)
  .pipe(minifyCss)
  .pipe(rev)
  .pipe(rename, {extname: '.min.css'});

var productionJs = lazypipe()
  .pipe(rev)
  .pipe(uglify)
  .pipe(rename, {extname: '.min.js'});

// compiles .less to .css
// [production] auto-prefixes, appends revision and compresses
// copies .css to /dist
gulp.task('build-css-app', function() {
  var stream = gulp.src('src/assets/styles/app.less')
    .pipe(less());

  if(gutil.env.production) {
    stream = stream
      .pipe(productionCss());
  }
  return stream
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});


// compiles .less to .css
// [production] auto-prefixes, appends revision and compresses
// copies .css to /dist
gulp.task('build-css-vendor', ['rename-css-vendor'], function() {
  var stream = gulp.src('src/assets/styles/vendor.less')
    .pipe(less());

  if(gutil.env.production) {
    stream = stream
      .pipe(productionCss());
  }
  return stream
    .pipe(gulp.dest('dist/styles'))
    .pipe(connect.reload());
});


// injects links for js/css files into dist/index.html
gulp.task('build-index', function() {
  var app, dist = {read: false, cwd: 'dist'};
  if(gutil.env.production) {
    app = gulp.src('**/app*.*', dist);
  } else {
    app = merge(
      gulp.src('**/app*.css', dist),
      gulp.src(['app/**/*.js', 'common/**/*.js'], {cwd: 'dist'})
        .pipe(plumber())
        .pipe(ngFilesort())
    );
  }
  return gulp.src('src/index.html')
    // [production, development] vendor styles
    .pipe(inject(
      gulp.src('**/vendor*.css', dist), {
        addRootSlash: false,
        name:        'vendor'
      }
    ))
    // [development] vendor scripts - references bowerFiles() in order to establish file order
    .pipe(gulpif(!gutil.env.production, inject(
      gulp.src(bowerFiles('**/*.js'), {read: false, cwd: 'bower_components'}), {
        addRootSlash: false,
        name:        'vendor',
        addPrefix:   'vendor'
      }
    )))
    // [production] vendor scripts
    .pipe(gulpif(gutil.env.production, inject(
      gulp.src('scripts/vendor*.js', dist), {
        name: 'vendor',
        addRootSlash: false
      }
    )))
    // [development, production] app scripts/styles
    .pipe(inject(
      app, {
        name: 'app',
        addRootSlash: false
      }
    ))
    // [production] config.js - a timestamp revision is appended to cache bust
    .pipe(gulpif(gutil.env.production, inject(
      gulp.src('**/*.config.js', dist), {
        name: 'config',
        addRootSlash: false,
        transform: function(filepath) {
          var now = new Date().getTime();
          return '<script src="' + filepath + '?v=' + now + '"></script>';
        }
      }
    )))
    .pipe(gulpif(gutil.env.production, minifyHtml({conditionals: true})))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});


// annotates angular dependency injections
// catches templates
// wraps concatenated angular modules in IIFE
// [production] appends revision and compresses
// copies to /dist
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
      .pipe(minifyHtml())
      .pipe(ngcache('templates.js', {module: ngApp}))
  )
    .pipe(ngFilesort())
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(concat('app.js'))
    .pipe(replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1\n'))
    .pipe(wrap("(function(angular) {\n\n'use strict';\n<%= contents %>\n\n})(window.angular);"))
    .pipe(productionJs())
    .pipe(gulp.dest('dist/scripts'));
});


// orders and concatenates vendor files
// [production] appends revision and compresses javascript
// copies to /dist
gulp.task('build-js-vendor', function() {
  return gulp.src(bowerFiles('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(productionJs())
    .pipe(gulp.dest('dist/scripts'));
});

// copies lang files into languages
gulp.task('copy-localisation', function() {
  return gulp.src('src/app/**/*.lang.json')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('dist/languages'));
});

// injects application and spec files into karma.conf.js
// copies to /test/.karma.conf.js
gulp.task('build-karma', function() {
  var files = series(
    gulp.src(bowerFiles('**/*.js', {includeDev: true, read: false})),
    gulp.src([
      'src/common/**/*.js',
      'src/app/**/*.js',
      'src/**/*.html',
      '!src/app/bootstrap.js'
    ])
  );
  return gulp.src('test/karma.conf.js')
    .pipe(inject(files, {
      addRootSlash: false,
      starttag:     'files: [',
      endtag:       ']',
      transform: function (filepath, file, i, length) {
        return ' \'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(rename({basename: '.karma.conf'}))
    .pipe(gulp.dest('test'));
});


// caches html files to $templateCache
// copies to /dist
gulp.task('cache-templates', function() {
  return merge(
    gulp.src('src/app/**/*.html'),
    gulp.src(bowerFiles('**/*.html'))
  )
    .pipe(plumber())
    .pipe(minifyHtml()) // used in development to catch angular expression errors
    .pipe(ngcache('templates.js', {module: ngApp}))
    .pipe(gulp.dest('./dist/app'))
    .pipe(connect.reload());
});


// remove the /dist folder
gulp.task('clean', function(cb) {
  del(['dist'], cb);
});


// remove any config.js file
// this is used by deployment builds
gulp.task('clean-config', function(cb) {
  del(['dist/**/config.js'], cb);
});


// remove the temporary karma.conf.js file used in gulp test
gulp.task('clean-test', function(cb) {
  del(['test/.karma.conf.js'], cb);
});


// copy configuration to dist/scripts
// this is required for running production builds locally as config.js is omitted
// from the javascript bundle
gulp.task('copy-config', function() {
  return gulp.src('src/app/config/config.js')
    .pipe(gulp.dest('dist/scripts'));
});


// copies favicon to /dist
gulp.task('copy-favicon', function() {
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist'));
});

// copies cpp-ui assets
gulp.task('copy-cppui-assets', function() {
  return gulp.src('bower_components/cpp-ui/dist/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});


// copies all main fonts to /dist
gulp.task('copy-fonts', function() {
  return gulp.src(bowerFiles('**/*.{otf,eot,svg,ttf,woff,woff2}'))
    .pipe(gulp.dest('dist/fonts'))
    .pipe(connect.reload());
});


// copies root .html files (those not used by angular) to /dist
gulp.task('copy-html', function() {
  return gulp.src(['src/*.html', '!src/index.html'])
    .pipe(gulpif(gutil.env.production, minifyHtml()))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});


// minifies images in production builds
// copies images to /dist
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


// copies angular app and dependencies to /dist
gulp.task('copy-js-app', function() {
  return gulp.src([
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/**/*.prot.js',
    '!**/*.page.js'
  ])
    .pipe(plumber())
    .pipe(cached('js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});


// copies bower main javascript files to /dist
gulp.task('copy-js-vendor', function() {
  return gulp.src(bowerFiles('**/*.js', {includeDev: true}), {base: 'bower_components'})
    .pipe(cached())
    .pipe(gulp.dest('dist/vendor'))
    .pipe(connect.reload());
});


// lints javascript
gulp.task('jshint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


// run karma unit tests
gulp.task('karma', function(done) {
  karma.server.start({
    configFile: __dirname + '/test/.karma.conf.js',
    singleRun:  true
  }, function() {
    done();
  });
});


// renames all bower .css to .less
// (required due to less being unable to import .css files)
gulp.task('rename-css-vendor', function() {
  return gulp.src('bower_components/**/*.css')
    .pipe(rename({prefix: '_', extname: '.less'}))
    .pipe(gulp.dest('bower_components'));
});


// starts development server
// [development] starts livereload and opens browser
gulp.task('serve', function() {
  var port = 9009,
      host = '127.0.0.1';

  connect.server({
    port:       port,
    root:      'dist',
    hostname:   host,
    livereload: true
  });
  open('http://' + host + ':' + port);
});


// watch files for changes and invokes respective tasks
gulp.task('watch', function() {
  gulp.watch('bower.json',  function() { runSequence(['copy-js-vendor', 'copy-fonts', 'copy-images'], 'build-index'); });
  gulp.watch([
    'src/**/*.js',
    '!src/**/*.spec.js',
    '!src/**/*.prot.js',
    '!src/**/*.page.js'
  ], function() { runSequence('copy-js-app', 'build-index', 'jshint'); });
  gulp.watch('src/app/**/*.html', function() { runSequence('cache-templates', 'build-index'); });
  gulp.watch([
    'src/**/*.less',
    '!src/styles/vendor.less'
  ], ['build-css-app']);
  gulp.watch([
    'src/styles/vendor.less'
  ], ['build-css-vendor']);
  gulp.watch('src/images/**', ['copy-images']);
  gulp.watch(['src/index.html'], ['build-index']);
});


// main gulp command
// run gulp for development build
// run gulp --production for production build
gulp.task('default', function(cb) {
  if(gutil.env.production) {
    runSequence('jshint', 'build', cb);
  } else {
    runSequence(['jshint', 'build'], 'serve', 'watch', cb);
  }
});

// create standalone build
gulp.task('build', ['clean'], function(cb) {
  if(gutil.env.production) {
    runSequence([
      'build-css-app',
      'build-css-vendor',
      'build-js-app',
      'build-js-vendor',
      'copy-config',
      'copy-favicon',
      'copy-fonts',
      'copy-html',
      'copy-images',
      'copy-cppui-assets',
      'copy-localisation'
    ], 'build-index', cb);
  } else {
    runSequence([
      'build-css-app',
      'build-css-vendor',
      'cache-templates',
      'copy-js-vendor',
      'copy-fonts',
      'copy-html',
      'copy-favicon',
      'copy-images',
      'copy-js-app',
      'copy-cppui-assets',
      'copy-localisation'
    ], 'build-index', cb);
  }
});

// execute tests
gulp.task('test', function() {
  runSequence('build-karma', 'karma', 'clean-test');
});

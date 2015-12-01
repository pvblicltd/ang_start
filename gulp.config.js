(function () {

  'use strict';

  module.exports = function () {

    var root = './',
      reports = './reports/',
      src = './src/',
      assets = src + 'assets/';

    //var wiredep = require('wiredep');
    var packageJson = require('./package.json');

    var config = {
      build_dir: './dist/',
      banner: '/*! Version ' + packageJson.version + ' - ' + new Date().toString() + ' */\n',
      version: packageJson.version,
      src_dir: src,
      root: root,
      reports: reports,
      e2e_report_dir: reports + 'e2e/',
      tests_report_dir: reports + 'coverage/',

      globs: {
        //js: [
        //  src + '*.js',
        //  src + 'main/**/*.js',
        //  src + 'blocks/**/*.js',
        //  src + 'sections/**/*.js',
        //  src + 'shared/**/*.js',
        //  src + 'config/**/*.js',
        //  '!' + src + 'templates.*.js',
        //  '!' + src + '**/*_test.js'
        //],

        //templatesApp: ['./src/sections/**/*.html', './src/shared/**/*.html', './src/main/obt-app.html'],

        //translations: './src/translations/**/*',
        sass: assets + 'sass/**/*.scss',
        css: assets + 'css/**/*.*',
        fonts: assets + 'fonts/**/*.*',
        images: assets + 'images/**/*.*',
        tests: ['./src/sections/**/*_test.js', './src/shared/**/*_test.js']
      },

      /*
       * Karma and test settings
       */
      karmaConf: __dirname + '/karma.conf.js',
      karmaPlugins: ['karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-junit-reporter'],
      karmaBowerDependencies: getKarmaBowerDependencies(),
      commonBuild: [
        'node_modules/common/build/launcher.min.js',
        'node_modules/common/build/common.js',
        'node_modules/common/build/common-angular1-4.js'
      ],
      appFilesToTest: [
        src + 'app.js',
        src + 'config/**/*.module.js',
        src + 'blocks/**/*.module.js',
        src + 'sections/**/*.module.js',
        src + 'blocks/**/*.js',
        src + 'config/**/*.js',
        src + 'shared/**/*.js',
        src + 'sections/**/*.js',
        src + 'templates.app.js'
      ],

      /*
       * Browser sync serving paths
       */
      serve: {
        dev: {
          root: src,
          port: 3008,
          routes: {
            '/common': "node_modules/common/build",
            '/bower_components': 'bower_components',
            '/express': 'src/translations',
            '/apps/nbt': 'src'
          },
          index: 'index.app.html'
        },
        dist: {
          root: 'build/app/',
          port: 3008
        },
        prod: {
          root: 'build/app/',
          port: 3008
        }
      },

      browserReloadDelay: 1000,

      /*
       * Node settings
       */
      defaultPort: 3005,
      serverFiles: 'mock',
      swaggerServer: 'mock/server.js'
    };

    config.karma = getKarmaOptions();

    return config;

    ///////////////////////

    function getKarmaBowerDependencies() {

      //return wiredep({
      //  devDependencies: true,
      //  dependencies: true,
      //  exclude: [/angular\//] // this already included in common so exclude to prevent double loading
      //})['js'];
    }

    function getKarmaOptions() {
      //var options = {
      //  files: [].concat(
      //    config.commonBuild, // common build files
      //    config.karmaBowerDependencies, // karma dependencies i.e. angular mocks
      //    config.appFilesToTest // app modules and files to test
      //  ),
      //  coverage: {
      //    dir: config.tests_report_dir,
      //    reporters: [ // types of reporters to use
      //      {type: 'html', subdir: 'report-html'}, // report in browser
      //      {type: 'lcov', subdir: 'report-lcov'}, // for jenkin reading
      //      {type: 'text-summary'} // output to the console
      //    ]
      //  },
      //  preprocessors: {
      //    './src/main/**/!(*_test)+(.js)': 'coverage',
      //    './src/blocks/**/!(*_test)+(.js)': 'coverage',
      //    './src/sections/**/!(*_test)+(.js)': 'coverage',
      //    './src/shared/**/!(*_test)+(.js)': 'coverage',
      //    './src/config/**/!(*_test)+(.js)': 'coverage'
      //  }
      //};

      //return options;
    }
  };
}());

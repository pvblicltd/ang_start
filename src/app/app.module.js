(function () {
    'use strict';

    angular
        .module('cpp-ui-spa-master', [
            'cpp-ui-spa-master.config',
            'cpp-ui-spa-master.case',
            'ui.bootstrap',
            'ui.bootstrap',
            'ui.cpp',
            'angularUtils.directives.dirPagination',
            'ui.router',
            'ngAnimate',
            'ngSanitize',
            'ngLocalize',
            'ngLocalize.Config',
            'ngLocalize.Events',
            'ngLocalize.InstalledLanguages',
            'ngCookies',
            'permission',
            'angular-ladda',
            'angular-underscore'
        ])
        .run(runBlock);

    function runBlock($rootScope, locale) {
      $rootScope.langs = [{
        value: 'en-GB',
        label: 'English'
      }, {
        value: 'cy',
        label: 'Cymraeg'
      }];

      // Language Select Function
      $rootScope.selectedLanguage = $rootScope.langs[_.findIndex($rootScope.langs, {value: locale.getLocale()})];

      $rootScope.updadeLang = function(lang) {
        locale.setLocale(lang.value);
      };

      $rootScope.globalNav = {
        pageTitle: {
          title: 'Page title',
          type: 'text',
          ref: '#'
        }
      };

    }

}());

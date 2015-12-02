(function () {
    'use strict';

    angular
        .module('cpp-ui-spa-master', [
            'cpp-ui-spa-master.config',
            'cpp-ui-spa-master.case',
            'cpp-ui-spa-master.routes',
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
        .run(runBlock)
        .value('globalConfig', {});

    function runBlock($rootScope, $state, locale) {
      $rootScope.langs = [{
        value: 'en-GB',
        label: 'English'
      }, {
        value: 'cy',
        label: 'Cymraeg'
      }];

      if(locale.getLocale() === 'en-US'){
        locale.setLocale('en-GB');
      }

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

      $rootScope.$on('$stateChangePermissionDenied', function() {
        // so far if no valid permissions we send them to the home page
        if (!$rootScope.waitingForCallback)
        {
          $state.go('index');
        }
      });

    }

}());

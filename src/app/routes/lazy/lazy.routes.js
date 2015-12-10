(function () {
  'use strict';

  angular
    .module('cpp-ui-spa-master.routes.lazy')
    .config(index);

  function index($stateProvider){
      $stateProvider.state('lazy', {
        url: '/lazy',
        templateUrl: 'app/routes/lazy/lazy.tpl.html',
        data: {
          pageTitle: 'Lazy'
        },
        controller: 'LazyController',
        controllerAs: 'lazy',
        resolve:{
          lazy: function($ocLazyLoad){
            return $ocLazyLoad.load(
              {
                name: 'app-ui-spa-master.routes.lazy',
                files:[
                  'app/routes/lazy/lazy.controller.js',
                  'app/routes/lazy/lazy.tpl.html'
                ],
              }
            );
          }
        }
      });
  }

}());

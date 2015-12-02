(function () {
  'use strict';

  angular
    .module('cpp-ui-spa-master.routes.index')
    .config(index);

  function index($stateProvider){
      $stateProvider.state('index', {
        url: '/',
        templateUrl: 'routes/index/index.tpl.html',
        data: {
          pageTitle: 'Index'
        },
        controller: 'IndexController',
        controllerAs: 'index'
      });
  }

}());

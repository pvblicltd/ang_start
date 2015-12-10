(function () {
  'use strict';

  angular
    .module('cpp-ui-spa-master.routes.lazy')
    .controller('LazyController', LazyController);

  function LazyController(){
    var vm = this;
    vm.message = 'Nice lazy loading !!';
  }

}());

(function () {
  'use strict';

  angular
    .module('cpp-ui-master.global.factorySample')
    .factory('factorySample', factorySample);

  /* @ngInject */
  function factorySample() {
    var service = {
      functionName: functionName
    };
    return service;

    ////////////////

    function functionName() {
      // code goes here
    }
  }

})();


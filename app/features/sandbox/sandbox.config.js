(function () {
  "use strict";

  angular.module('sandbox').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('sandbox', {
      url : '/sandbox',
      controller : 'Sandbox',
      controllerAs : 'vm',
      templateUrl : 'app/features/sandbox/sandbox.html'
    });
  }
}());


(function () {
  'use strict';

  angular.module('handy-widgets-demo').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider.state('handy-widgets-demo', {
      url: '/handy-widgets-demo',
      templateUrl: 'app/features/handy-widgets-demo/handy-widgets-demo.html',
      controller: 'HandyWidgetsDemo'
    });
  }
}());
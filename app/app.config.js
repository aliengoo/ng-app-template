(function () {
  "use strict";

  angular.module('app').config(config);

  config.$inject = [
    '$httpProvider',
    '$urlRouterProvider',
    'cfpLoadingBarProvider',
    'localStorageServiceProvider',
    'authInterceptorServiceProvider',
    'serverErrorServiceProvider'];

  function config($httpProvider, $urlRouterProvider, cfpLoadingBarProvider, localStorageServiceProvider, authInterceptorServiceProvider, serverErrorServiceProvider) {

    authInterceptorServiceProvider.setLocationOnStatus('/auth-error', 401);

    $httpProvider.interceptors.push('authInterceptorService');

    // TODO : Spinner enable/disable
    cfpLoadingBarProvider.includeSpinner = false;

    // TODO : Set the prefix for local storage
    localStorageServiceProvider.setPrefix('app');

    $urlRouterProvider.otherwise('/home');
  }
}());







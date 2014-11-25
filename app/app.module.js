(function () {
  "use strict";

  angular.module('app', [
    // Angularjs
    'ngResource',
    'ngCookies',
    'ngAnimate',

    // third-party modules
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'angular-loading-bar',
    'angular-toastr',
    'cfp.hotkeys',
    'LocalStorageModule',
    'ui.select2',

    // blockUI doesn't always play nice with ui-router
    //'blockUI',

    // app modules
    'common',
    'data',
    'bootstrapWidgets',

    // app features
    'auth',
    'auth-error',
    'server-error',
    'home',
    'bootstrap-widgets-demo',
    'faker'
    ]);
}());
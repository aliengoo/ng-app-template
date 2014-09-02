(function () {
  app.config([
    '$provide',
    '$httpProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$logProvider',
    'cfpLoadingBarProvider',
    'localStorageServiceProvider',
    'blockUIConfigProvider', function ($provide, $httpProvider, $stateProvider, $urlRouterProvider, $logProvider, cfpLoadingBarProvider, localStorageServiceProvider, blockUIConfigProvider) {

      // TODO : Uncomment to disable the spinner
      cfpLoadingBarProvider.includeSpinner = false;

      $httpProvider.defaults.withCredentials = true;

      // TODO : Set the prefix for local storage
      //localStorageServiceProvider.setPrefix('myPrefix');

      $logProvider.debugEnabled(true);

      blockUIConfigProvider.message('working...');

      // TODO : Handle uncaught exceptions here
      $provide.decorator("$exceptionHandler", ['$delegate', '$injector', function ($delegate, $injector) {
        return function (exception, cause) {
          $delegate(exception, cause);

          var rootScope = $injector.get('$rootScope');
          var localStorageService = $injector.get('localStorageService');

          localStorageService.set('lastError', exception);

          rootScope.$broadcast('uncaughtException', {
            exception: exception,
            cause: cause
          });
        };
      }]);

      // TODO : Specify some routes
      $urlRouterProvider.otherwise('/home');

      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      });
    }]);
}());






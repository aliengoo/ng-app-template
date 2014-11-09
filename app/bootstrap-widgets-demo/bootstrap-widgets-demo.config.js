(function(){
  "use strict";

  angular.module('bootstrap-widgets-demo').config(bootstrapWidgetsDemo);

  bootstrapWidgetsDemo.$inject = ['$stateProvider', 'storageServiceProvider'];

  function bootstrapWidgetsDemo($stateProvider, storageServiceProvider) {

    storageServiceProvider.setPrefix('bootstrap-widgets-demo');

    var resolveCustomerLabels = function($q) {
      return $q.when(['arse', 'richard', 'of', 'york', 'gave', 'battle', 'in', 'vain']);
    };


    $stateProvider.state('bootstrap-widgets-demo', {
      url: '/bootstrap-widgets-demo',
      templateUrl: 'bootstrap-widgets-demo/bootstrap-widgets-demo.html',
      controller: 'BootstrapWidgetsDemo',
      resolve : {
        customerLabels : ['$q', resolveCustomerLabels]
      }
    });
  }
}());

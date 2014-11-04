(function () {
  "use strict";

  angular.module('bootstrap-widgets-demo').controller('BootstrapWidgetsDemo', BootstrapWidgetDemo);

  BootstrapWidgetDemo.$inject = ['$scope', 'customerModelService'];

  function BootstrapWidgetDemo($scope, customerModelService) {
    var customer = customerModelService.createInstance($scope);

    customer.title = 'Mr';
    customer.gender = 'male';
    customer.labels = ['arse'];
  }

}());

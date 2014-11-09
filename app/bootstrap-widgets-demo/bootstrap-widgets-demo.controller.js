(function () {
  "use strict";

  angular.module('bootstrap-widgets-demo').controller('BootstrapWidgetsDemo', BootstrapWidgetDemo);

  BootstrapWidgetDemo.$inject = ['$scope', 'customerModelService', 'customerLabels'];

  function BootstrapWidgetDemo($scope, customerModelService, customerLabels) {
    var customer = customerModelService.createInstance($scope);

    customer.title = 'Mr';
    customer.gender = 'male';
    customer.labels = ['arse', 'richard'];

    $scope.customerLabelsTags = customerLabels;
  }

}());

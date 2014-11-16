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

    $scope.mainOccupationSelect2Options = {};
    $scope.interestsSelect2Options = {};

    $scope.availableDevices = [
      {
        'id' : 'android',
        'text' : 'Android'
      },
      {
        'id' : 'ios',
        'text' : 'iOS'
      },
      {
        'id' : 'windowsphone',
        'text' : 'Windows Phone'
      }
    ];
  }

}());

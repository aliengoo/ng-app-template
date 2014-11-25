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

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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

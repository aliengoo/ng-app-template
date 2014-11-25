(function () {
  "use strict";

  angular.module('faker').directive('userAddress', userAddress);

  function userAddress() {
    return {
      restrict: 'E',
      scope: {
        address: '='
      },
      templateUrl: 'features/faker/faker.user-address.html'
    };
  }

}());

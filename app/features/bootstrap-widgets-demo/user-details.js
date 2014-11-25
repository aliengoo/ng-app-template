(function () {

  "use strict";

  angular.module('bootstrap-widgets-demo').directive('userDetails', userDetails);

  function userDetails() {

    return {
      restrict: 'E',
      templateUrl: 'app/features/bootstrap-widgets-demo/user-details.html',
      scope: {
        ngModel: '='
      }
    };
  }

}());



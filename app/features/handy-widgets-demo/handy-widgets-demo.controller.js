(function () {
  'use strict';

  angular.module('handy-widgets-demo').controller('HandyWidgetsDemo', HandyWidgetsDemo);

  HandyWidgetsDemo.$inject = ['$scope'];

  function HandyWidgetsDemo($scope) {

    $scope.customer = {
      firstName : 'Homer'
    };

  }
}());
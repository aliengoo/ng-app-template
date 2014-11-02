(function(){
  "use strict";

  angular.module('faker').controller('FakerUser', FakerUser);

  FakerUser.$inject = ['$scope', 'user'];

  function FakerUser($scope, user) {
    $scope.user = user;
  }
}());

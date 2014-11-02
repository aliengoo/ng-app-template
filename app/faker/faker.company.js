(function () {
  "use strict";

  angular.module('faker').directive('company', company);

  function company(){
    return {
      restrict : 'E',
      templateUrl : 'faker/faker.company.html',
      scope : {
        company : '='
      }
    };
  }
}());

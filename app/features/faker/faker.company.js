(function () {
  "use strict";

  angular.module('faker').directive('company', company);

  function company(){
    return {
      restrict : 'E',
      templateUrl : 'app/features/faker/faker.company.html',
      scope : {
        company : '='
      }
    };
  }
}());

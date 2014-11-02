(function(){
  "use strict";

  angular.module('faker').factory('fakerUserDataService', fakerUserDataService);

  fakerUserDataService.$inject = ['$resource'];

  function fakerUserDataService($resource) {
    return $resource('faker/user', {});
  }
}());

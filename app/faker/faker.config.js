(function(){
  "use strict";

  angular.module('faker').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider.state('faker-user', {
      url : '/faker-user',
      controller : 'FakerUser',
      templateUrl : 'faker/faker-user.html',
      resolve : {
        user : ['fakerUserDataService', resolveUser]
      }
    });
  }

  function resolveUser(fakerUserDataService) {
    return fakerUserDataService.get().$promise;
  }
}());

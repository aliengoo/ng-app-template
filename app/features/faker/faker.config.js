(function(){
  "use strict";

  angular.module('faker').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider.state('faker-user', {
      url : '/faker-user',
      controller : 'FakerUser',
      controllerAs : 'vm',
      templateUrl : 'app/features/faker/faker-user.html',
      resolve : {
        user : ['fakerUserDataService', resolveUser]
      }
    });
  }

  function resolveUser(fakerUserDataService) {
    return fakerUserDataService.get().$promise;
  }
}());

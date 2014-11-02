(function(){
  "use strict";

  angular.module('faker').controller('FakerUser', FakerUser);

  FakerUser.$inject = ['user'];

  function FakerUser(user) {
    var vm = this;
    vm.user = user;
  }
}());

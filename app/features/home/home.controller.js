(function () {
  "use strict";

  angular.module('home').controller('Home', Home);

  function Home() {
    var vm = this;
    vm.message = 'Hey there!';
  }

}());


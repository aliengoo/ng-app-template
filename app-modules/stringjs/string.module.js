(function(){
  "use strict";

  angular.module('stringjs', []).factory('S', S);

  function S() {
    return window.S;
  }
}());


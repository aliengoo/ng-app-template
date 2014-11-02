(function(){
  "use strict";

  angular.module('common').filter('jsonStringify', jsonStringify);

  jsonStringify.$inject = [];

  function jsonStringify() {
    return function(data) {
      if (data) {
        return JSON.stringify(data, null, 2);
      }

      return "no data!";
    };
  }
}());

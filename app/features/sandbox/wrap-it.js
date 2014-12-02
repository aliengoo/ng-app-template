(function () {
  "use strict";

  angular.module('sandbox').directive('wrapIt', wrapIt);

  function wrapIt() {

    var ddo = {
      restrict : 'A',
      require : '^form',
      compile : function($e, $a){

        console.log($e.outerHTML);

        return function($s, $e, $a, form) {

        };
      }
    };

    return ddo;

  }
}());

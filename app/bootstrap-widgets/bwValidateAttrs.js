(function(){

  "use strict";

  angular.module('bootstrapWidgets').factory('bwValidateAttrs', bwValidateAttrs);

  bwValidateAttrs.$inject = ['obj'];

  function bwValidateAttrs(obj) {
    var exports = {
      validate : validate
    };

    return exports;

    //////////

    function validate($a, requiredAttrs, errors) {
      var checkAttr = function(requiredAttr) {

        if (!obj.hasOwnPropertyWithValue($a, requiredAttr)){
          errors.push("'" + requiredAttr + "' attribute is required");
        }
      };

      if (angular.isArray(requiredAttrs)){
        angular.forEach(requiredAttrs, checkAttr);
      }

      if (angular.isString(requiredAttrs)){
        checkAttr(requiredAttrs);
      }
    }
  }
}());

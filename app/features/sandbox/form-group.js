(function () {
  "use strict";

  angular.module('sandbox').directive('formGroup', formGroup);

  function formGroup() {
    return {
      restrict : 'E',
      require : '^form',
      replace : true,
      transclude : true,
      compile : function($e, $a){

        var t =
          '<div class="form-group">' +
            '<label class="control-label">{{label}}</label>' +
            '<div ng-transclude></div>' +
          '</div>';


        return function($s, $e, $a, form){

        }
      }
    };
  }
}());


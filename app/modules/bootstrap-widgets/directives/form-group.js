(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('formGroup', formGroup);

  function formGroup() {
    return {
      restrict : 'A',
      require : '^form',
      replace : true,
      transclude : 'element',
      compile : function($e, $a) {

        console.log($e);

        $e.addClass('form-control');

        $e.removeAttr('form-group');

        var t =
          '<div>' +
            '<label class="control-label"></label>' +
            $e[0].outerHTML +
          '</div>';

        console.log(t);

        $e.html(t);

        return function($s, $e, $a, form) {

        };
      }
    };
  }
}());


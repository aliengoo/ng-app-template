(function () {
  "use strict";

  /*

   Bootstrap includes validation styles for error, warning, and success states
   on form controls.

   To use, add .has-warning, .has-error, or .has-success to the parent element.
   Any .control-label, .form-control, and .help-block within that element will
   receive the validation styles.

   */
  angular.module('bootstrapWidgets').directive('validationState', validationState);

  validationState.$inject = ['$log'];

  function validationState($log) {
    return {
      restrict : 'A',
      require : '^form',
      link : function($s, $e, $a){

        if (!$e.hasClass('form-group')){
          $log.error('validate-state must be set on an element a form-group class.');
        }

        var targetElement = $e.find('[ng-model]');

        if (!targetElement) {
          return;
        }

        var ngModel = angular.element(targetElement).controller('ngModel');

        if (!ngModel) {
          return;
        }

        ngModel.$viewChangeListeners.push(function () {
          $e.removeClass('has-error');
          $e.removeClass('has-success');

          if (ngModel.$valid){
            $e.addClass('has-success');
          } else {
            $e.addClass('has-error');
          }
        });
      }
    };
  }
}());


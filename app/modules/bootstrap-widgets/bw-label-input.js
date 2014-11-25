(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwLabelInput', bwLabelInput);

  bwLabelInput.$inject = ['bwCompileFn', '$timeout', '$log'];

  function bwLabelInput(bwCompileFn, $timeout, $log) {

    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<input type="text" ng-list class="form-control bw-input <%= classes %>" <%= classes %> <%= attrs %>/>' +
      '<span><%= helpBlocks %></span>' +
      '</div>';


    function preLinkFn($s, $e, $a, form) {
      $timeout(function () {
        $e.find('input').select2({
          'multiple': true,
          'simple_tags': true,
          'tags': $s[$a.tags]
        });

        $s.$apply();

      }, 100);
    }

    function preValidateFn($e, $a, requiredAttr, errors) {
      if ($a.name === $a.tags){
        errors.push('Possible weirdness by calling the name of the element the same as the name of the tags attribute.  Recommend changing the tags attribute to another name.');
      }
    }

    return {
      restrict: 'E',
      require: '^form',
      compile: bwCompileFn.compileFn([
        'name',
        'ngModel',
        'tags'
      ], template, null, preLinkFn, preValidateFn)
    };
  }
}());

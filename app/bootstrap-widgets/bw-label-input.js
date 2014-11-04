(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwLabelInput', bwLabelInput);

  bwLabelInput.$inject = ['bwCompileFn'];

  function bwLabelInput(bwCompileFn) {

    var template =
      '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
      '<span><%= labels %></span>' +
      '<select ui-select2="select2Options" ng-model="ngModel" multiple class="form-control bw-input <%= classes %>" <%= classes %> <%= attrs %>>' +
//        '<option value="{{item}}" ng-repeat="item in ngModel">{{item}}</option>' +
      '</select>'+
      '<span><%= helpBlocks %></span>' +
      '</div>';

    return {
      restrict: 'E',
      require: '^form',
      scope : {
         ngModel : '='
      },
      compile: bwCompileFn.compileFn([
        'name',
        'ngModel'
      ], template, null, function($s, $e, $a, form) {
        $s.select2Options = {
          tags : [],
          tokenSeparators: [",", " "],
          allowClear: true
        };


      })
    };
  }
}());

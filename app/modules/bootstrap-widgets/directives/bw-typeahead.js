(function () {
  "use strict";

  angular.module('bootstrapWidgets').directive('bwTypeahead', bwTypeahead);

  function bwTypeahead(){
    return {
      restrict : 'E',
      template : function() {
        var template =
          '<div class="form-group" ng-form="<%= childFormName %>" ng-class="{\'has-error\' : <%= name %>hasError(), \'has-success\' : <%= name %>hasSuccess()}">' +
          '<span><%= labels %></span>' +
          '<input type="text" class="form-control bw-input <%= classes %>" <%= classes %> <%= attrs %>/>' +
          '<span><%= helpBlocks %></span>' +
          '</div>';

        return template;
      }
    };
  }
}());

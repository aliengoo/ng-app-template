(function(){

  "use strict";

  angular.module('bootstrapWidgets').factory('bwRenderErrors', bwRenderErrors);

  bwRenderErrors.$inject = ['template', '_'];

  function bwRenderErrors(template, _) {

    var exports = {
      render : render
    };

    return exports;

    //////////

    var templateStr = '<div class="panel panel-danger">' +
      '<header class="panel-heading"><h4><%= title %></h4></header>' +
      '<div class="panel-body">' +
      '<code class="html-code"><%= markup %></code>' +
      '</div>' +
      '<div class="panel-footer">' +
      '<ul>' +
      '<%= errorsHtml %>' +
      '</ul>' +
      '</div>' +
      '</div>';

    function render(title, errors, element) {
      var errorsHtml = '';

      angular.forEach(errors, function(error) {
        errorsHtml += '<li class="text-danger">'+ error + '</li>';
      });

      var config = {
        title : title,
        markup : 'No markup',
        errorsHtml : errorsHtml
      };

      if (element) {
        config.markup = _.escape(element[0].outerHTML);
      }

      return template.render(templateStr, config);
    }
  }
}());

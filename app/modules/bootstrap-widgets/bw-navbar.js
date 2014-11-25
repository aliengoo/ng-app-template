(function(){

  "use strict";

  angular.module('bootstrapWidgets').directive('bwNavbar', bwNavbar);

  bwNavbar.$inject = ['$state', '$templateCache', '$rootScope', 'template'];

  function bwNavbar($state, $templateCache, $rootScope, template) {
    return {
      restrict : 'E',
      compile : function($e) {

        var states = '';

        angular.forEach($e.find('state'), function(stateElement) {
          var state = $state.get($(stateElement).attr('name'));

          states += '<li ng-class="{\'active\' : currentStateName === \'' + state.name + '\'}"><a ui-sref=\'' + state.name + '\'>' + $(stateElement).html() + '</a></li>';
        });

        var templateData = {
          states : states,
          brand : $e.find('brand').html()
        };

        $e.html(template.render($templateCache.get('modules/bootstrap-widgets/bw-navbar.html'), templateData));

        return function($s) {

          $s.currentStateName = $state.current.name;

          $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            $s.currentStateName = toState.name;
          });

        };
      }
    };
  }
}());

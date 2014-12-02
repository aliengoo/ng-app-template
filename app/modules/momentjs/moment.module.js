(function(){
  "use strict";

  angular.module('momentjs', []).factory('moment', moment);

  function moment() {
    return window.moment;
  }
}());

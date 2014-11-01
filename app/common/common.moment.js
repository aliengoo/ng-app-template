(function(){
  "use strict";

  angular.module('common').factory('moment', moment);

  function moment() {
    return window.moment;
  }
}());

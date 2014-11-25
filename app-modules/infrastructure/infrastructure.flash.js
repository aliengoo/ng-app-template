(function () {
  "use strict";

  angular.module('infrastructure').factory('flash', flash);

  flash.$inject = ['localStorageService'];

  function flash(localStorageService) {
    var exports = {
      set: set,
      get: get,
      peek: peek
    };

    return exports;

    // implementation

    function set(message) {
      localStorageService.set('flash', message);

      return message;
    }

    function get() {

      var message = localStorageService.get('flash');

      localStorageService.set('flash', undefined);

      return message;
    }

    function peek() {
      return localStorageService.get('flash');
    }
  }
}());

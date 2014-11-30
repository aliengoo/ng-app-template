(function () {
  "use strict";

  angular.module('infrastructure').factory('flash', flash);

  flash.$inject = ['storageService'];

  function flash(storageService) {
    var exports = {
      set: set,
      get: get,
      peek: peek
    };

    return exports;

    // implementation

    function set(message) {
      storageService.set('flash', message);

      return message;
    }

    function get() {

      var message = storageService.get('flash');

      storageService.set('flash', undefined);

      return message;
    }

    function peek() {
      return storageService.get('flash');
    }
  }
}());

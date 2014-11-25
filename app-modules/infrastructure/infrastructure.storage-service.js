(function () {
  "use strict";

  angular.module('infrastructure').provider('storageService', storageServiceProvider);

  // TODO : replace with session, local, cookie, whatever "backend"

  function storageServiceProvider() {
    var self = {};
    self.data = {};

    self.prefix = '';

    var provider = {
      $get: $get,
      setPrefix: setPrefix
    };

    function setPrefix(prefix) {
      self.prefix = prefix || '';
    }

    $get.$inject = [];

    function $get() {
      var exports = {
        get: get,
        set: set
      };

      return exports;

      ///////////////

      function get(key) {

        if (self.data.hasOwnProperty(self.prefix + key)) {
          return self.data[self.prefix + key];
        }

        return undefined;
      }

      function set(key, value) {
        self.data[self.prefix + key] = value;

        return value;
      }
    }

    return provider;
  }
}());


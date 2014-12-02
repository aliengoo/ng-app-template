(function () {
  "use strict";

  angular.module('infrastructure').factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log) {
    var exports = {};

    exports.error = $log.error;
    exports.warn = $log.warn;
    exports.info = $log.info;

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.dir
    if (console.dir) {
      exports.dir = console.dir;
    } else {
      exports.dir = $log.info;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.table
    if (console.table) {
      exports.table = console.table;
    } else {
      exports.table = $log.info;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Console.trace
    if (console.trace) {
      exports.trace = console.trace;
    } else {
      exports.trace = $log.info;
    }

    return exports;
  }

}());

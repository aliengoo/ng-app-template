(function () {
  "use strict";

  angular.module('auth').provider('authInterceptorService', authInterceptorServiceProvider);

  function authInterceptorServiceProvider() {
    var exports = {};

    exports.statusLocationMap = {};

    /**
     *
     * @param location - the location path
     * @param status - the status code
     */
    exports.setLocationOnStatus = function (location, status) {

      if (angular.isUndefined(location)){
        throw new Error('authInterceptorService requires a location path');
      }

      if (!angular.isNumber(status)) {
        throw new Error('authInterceptorService requires a status code to be numeric');
      }

      exports.statusLocationMap[status] = location;
    };

    exports.$get = ['$location', '$q', '$log', auth];

    function auth($location, $q, $log) {

      var service = {
        responseError: responseError
      };

      return service;

      function responseError(rejection) {
        if (exports.statusLocationMap.hasOwnProperty(rejection.status)){
          $location.path(exports.statusLocationMap[rejection.status]);
        } else {
          $log.error('authentication failed with status ' + rejection.status);
          $log.error(rejection);
        }

        return $q.reject(rejection);
      }
    }

    return exports;
  }
}());


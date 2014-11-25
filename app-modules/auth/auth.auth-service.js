(function () {
  "use strict";

  angular.module('auth').provider('authService', authServiceProvider);

  function authServiceProvider() {
    var exports = {};

    exports.authServiceUrl = '';

    exports.setAuthServiceUrl = function (authServiceUrl) {
      exports.authServiceUrl = authServiceUrl;
    };

    exports.$get = ['$http', function ($http) {
      var authService = {
        authenticate: authenticate,
        authorize : authorize
      };

      return authService;

      function authenticate(credentials) {
        return $http({
          method: 'POST',
          url: exports.authServiceUrl,
          data: credentials
        });
      }

      function authorize() {
        return $http({
          method : 'GET',
          url : exports.authServiceUrl
        });
      }
    }];

    return exports;
  }
}());

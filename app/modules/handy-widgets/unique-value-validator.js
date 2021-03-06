(function () {
  "use strict";

  angular.module('handyWidgets').directive('uniqueValueValidator');

  uniqueValueValidator.$inject = ['$http', '$log'];

  function uniqueValueValidator($http, $log) {
    var ddo = {
      restrict : 'A',
      require : 'ngModel',
      link : function($s, $e, $a, ngModel) {
        if (!$a.uniqueValueValidator) {
          $log.error('uniqueValueValidator requires a base url, e.g. http://www.mywebsite.com/api/is-user-unique?u=');
          return;
        }

        ngModel.$asyncValidators.uniqueValue = function(val) {
          return $http.get($a.uniqueValueValidator + val);
        };
      }
    };

    return ddo;
  }
}());


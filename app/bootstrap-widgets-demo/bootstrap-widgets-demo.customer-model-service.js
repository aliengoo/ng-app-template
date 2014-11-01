(function(){
  "use strict";

  angular.module('bootstrap-widgets-demo').factory('customerModelService', customerModelService);

  customerModelService.$inject = ['logger'];

  function customerModelService(logger) {
    function Customer($scope) {

      var self = this;

      self.customer = {
        destroy : destroy
      };

      if ($scope) {
        self.customerWatch = $scope.$watch(function() {
          return self.customer;
        }, function (newCustomer) {
          // TODO : if customer changes, do stuff
        }, true);

         self.scopeDestroyed = $scope.$on('$destroy', function() {
          self.customer.destroy();
        });

        $scope.customer = self.customer;
      }

      return self.customer;

      /////////

      function destroy() {
        logger.info('destroying customer');
        if (self.customerWatch) {
          self.customerWatch();
        }

        if (self.scopeDestroyed) {
          self.scopeDestroyed();
        }
      }
    }

    return {
      /**
       *
       * @param $scope - the scope of the controller - the new customer object will be attached to $scope.customer
       * @returns {customerModelService.Customer} attached to the scope
       */
      createInstance : function($scope) {
        if (!$scope) {
          throw new Error('customerModelService: Cannot create Customer instance because it requires $scope');
        }
        return new Customer($scope);
      }
    };
  }
}());

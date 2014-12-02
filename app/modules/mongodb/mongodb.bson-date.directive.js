(function () {
  "use strict";

  /**
   * Parser/Formatter for ngModel that provides a ISODate -> string -> ISODate conversion
   */
  angular.module('mongodb').directive('bsonDate', bsonDate);

  bsonDate.$inject = ['moment'];

  function bsonDate(moment) {

    var defaultDateFormat = 'YYYY-MM-DD';

    var exports = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };

    return exports;

    ///////////

    function link($s, $e, $a, ngModel) {
      ngModel.$formatters.push(formatter);
      ngModel.$parsers.push(parser);

      /**
       * Format the model value
       * @param modelValue
       * @returns a model value
       */
      function formatter(modelValue) {
        if (modelValue && modelValue.hasOwnProperty('$date')) {
          if (angular.isNumber(modelValue.$date)) {
            var result = moment(modelValue.$date).format($a.bsonDate || defaultDateFormat);
            return result;
          }
        }

        return modelValue;
      }

      /**
       * Parse the view value
       * @param viewValue
       * @returns {*}
       */
      function parser(viewValue) {
        var d = moment(viewValue, $a.bsonDate || defaultDateFormat);

        if (d.isValid()) {
          return {
            $date: parseInt(d.format("X")) * 1000
          };
        }

        return undefined;
      }
    }
  }
}());

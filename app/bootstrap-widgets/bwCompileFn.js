(function () {

  "use strict";

  angular.module('bootstrapWidgets').factory('bwCompileFn', bwCompileFn);

  bwCompileFn.$inject = ['template', 'bwValidateAttrs', 'bwRenderErrors', 'bwRenderHelpBlocks'];

  function bwCompileFn(template, bwValidateAttrs, bwRenderErrors, bwRenderHelpBlocks) {
    var exports = {
      compileFn: compileFn
    };

    return exports;

    // implementation

    function CompileFactory(requiredAttrs, templateStr, preTemplateFn, preLinkFn, preValidateFn) {

      var self = this;

      self.nameIsValid = function (str) {
        return /^\w+$/.test(str);
      };

      self.requiredAttrs = requiredAttrs;
      self.templateStr = templateStr;
      self.preTemplateFn = preTemplateFn;
      self.compile = function ($e, $a) {
        var errors = [];

        if (preValidateFn) {
          preValidateFn($e, $a, self.requiredAttrs, errors)
        }

        bwValidateAttrs.validate($a, self.requiredAttrs, errors);

        if ($a.hasOwnProperty('name')) {
          if (!self.nameIsValid($a.name)) {
            errors.push('\'name\' attribute should only contain letters and numbers');
          }
        }

        if (errors.length > 0) {
          $e.html(bwRenderErrors.render($e.context.nodeName.toLowerCase() + " Errors", errors, $e));
          return;
        }

        var data = {
          attrs: '',
          classes: '',
          labels: '',
          helpBlocks: '',
          name: $a.name,
          childFormName: $a.name + "Form"
        };

        // process help blocks
        data.helpBlocks = bwRenderHelpBlocks.render($e);

        // process labels
        angular.forEach($e.find('label'), function (label) {
          if (label.outerHTML) {
            data.labels += label.outerHTML;
          }
        });

        // process attributes
        angular.forEach(Object.keys($a), function (key) {
          if (key.indexOf('$') !== 0) {
            if (key === "class") {
              data.classes += $a[key];
            } else {
              data.attrs += $a.$attr[key] + "='" + $a[key] + "' ";
            }
          }

          $e.removeAttr($a.$attr[key]);
        });

        // run preTemplateFn is provided
        if (self.preTemplateFn) {
          self.preTemplateFn($e, $a, data, template);
        }

        // render
        var html = template.render(self.templateStr, data);

        // overwrite HTML
        $e.html(html);

        // ensure the label element has the control-label css class
        $($e).find('label').addClass('control-label');

        return function ($s, $e, $a, form) {
          if (preLinkFn) {
            preLinkFn($s, $e, $a, form);
          }

          // set up form properties
          $s.form = form;

          var element = angular.element($($e).find('[name="' + $a.name + '"]').first());

          // allow access to the element
          $s[$a.name + "Element"] = element;

          // allow access to the ngModelController
          var ngModelCtrl = element.controller('ngModel');
          $s[$a.name] = ngModelCtrl;

          // allow access to the "hasError"
          $s[$a.name + 'hasError'] = function () {
            return ngModelCtrl.$invalid && ngModelCtrl.$dirty;
          };

          // allow access to the "hasSuccess"
          $s[$a.name + 'hasSuccess'] = function () {
            return ngModelCtrl.$valid && ngModelCtrl.$dirty;
          };

          // handle startup, and the set state of model accordingly.
          var startupWatch = $s.$watch(function () {
            return ngModelCtrl.$modelValue;
          }, function (n) {
            if (ngModelCtrl.$pristine && n && n.length > 0) {
              ngModelCtrl.$dirty = true;
              ngModelCtrl.$pristine = false;

              startupWatch();
            }
          });
        };
      };
    }

    function compileFn(requiredAttrs, templateStr, preTemplateFn, preLinkFn, preValidateFn) {
      return new CompileFactory(requiredAttrs, templateStr, preTemplateFn, preLinkFn, preValidateFn).compile;
    }
  }

}());

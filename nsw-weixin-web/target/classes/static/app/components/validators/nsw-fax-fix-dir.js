
/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswFaxFix", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /^\d+[-|\d]*\d+$/;

                var validator = function (value) {
                    var isValid = regexp.test(value);

                    if (!value || isValid) {
                        ctrl.$setValidity('nswfaxfix', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswfaxfix', false);
                        return value;
                    }
                };
                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);
                /* attr.$observe('nswInt', function () {
                 validator(ctrl.$viewValue);
                 });*/
            }
        };

    }]);
}(angular));
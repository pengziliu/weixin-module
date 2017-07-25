/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswMoney", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }

                var regexp = /^[0-9]+(\.)?(\d{1,2})?$/;

                var validator = function (value) {
                    var isValid = regexp.test(value);

                    if (!value || isValid) {
                        ctrl.$setValidity('nswmoney', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswmoney', false);
                        return value;
                    }
                };
                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);
                attr.$observe('nswMoney', function () {
                    validator(ctrl.$viewValue);
                });
            }
        };

    }]);
}(angular));
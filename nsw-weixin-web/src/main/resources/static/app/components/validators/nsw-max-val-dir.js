/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswMaxVal", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var validator = function (value) {
                    var intVal = Number(value) || 0;
                    var nswMaxVal = parseInt(attr.nswMaxVal) || 0;

                    if (nswMaxVal === 0 || intVal <= nswMaxVal) {
                        ctrl.$setValidity('nswmaxval', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswmaxval', false);
                        return value;
                    }
                };
                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);
                attr.$observe('nswMaxVal', function () {
                    validator(ctrl.$viewValue);
                });
            }
        };

    }]);
}(angular));
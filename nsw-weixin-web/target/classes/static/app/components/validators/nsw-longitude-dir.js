/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswLongitude", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }

                var regexp = /^0$|^-?0\.\d*[1-9]$|^-?[1-9](\.\d*[1-9])?$|^-?[1-9]\d(\.\d*[1-9])?$|^-?1[0-7]\d(\.\d*[1-9])?$|^-?180$/;

                var validator = function (value) {
                    var isValid = regexp.test(value);

                    if (!value || isValid) {
                        ctrl.$setValidity('nswlongitude', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswlongitude', false);
                        return value;
                    }
                };
                ctrl.$formatters.push(validator);
                ctrl.$parsers.unshift(validator);
            }
        };

    }]);
}(angular));

/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswEmail", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

                var validator = function (value) {
                    var isValid = regexp.test(value);

                    if (!value || isValid) {
                        ctrl.$setValidity('nswemail', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswemail', false);
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
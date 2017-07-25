/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswNotZh", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /^[^\u4e00-\u9fa5]*$/;

                var validator = function (value) {
                    var isValid = regexp.test(value);

                    if (!value || isValid) {
                        ctrl.$setValidity('nswnotzh', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswnotzh', false);
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
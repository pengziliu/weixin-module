/**
 * Created by wanghy on 2016/12/29.
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("startEndChar", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /^[,|，|\|\|]+|[,|，|\|\|]+$/;
                var validator = function (value) {
                    var isValid = regexp.test(value);
                    if (!value || !isValid) {
                        ctrl.$setValidity('startendchar', true);
                        return value;
                    } else {
                        ctrl.$setValidity('startendchar', false);
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
/**
 * Created by wanghy on 2016/12/29.
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswUnique", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var splitter =/[\|\|]+|[,，]+/; //line: ignore
                var isUnique = function isUnique(valueArr) {
                    var len = valueArr.length;
                    if(len > 1 && len > _.uniq(valueArr).length && _.trim(valueArr[0]) && _.trim(valueArr[len-1])) {
                        return false;
                    }
                    return true;
                };
                var validator = function (value) {
                    var valueArr = (value || '').split(splitter);
                    if (!value || isUnique(valueArr)) {
                        ctrl.$setValidity('nswunique', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswunique', false);
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
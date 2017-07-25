/**
 * Created by wanghy on 2017/1/4.
 */

(function (angular) {
    "use strict";

    angular.module('platform').directive("nswNoEmpty", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var splitter =/[\|\|]+|[,，]+/;
                var isEmpty = function isEmpty(valueArr) {
                    var flag = false;
                    _.forEach(valueArr, function (val, index) {
                        /*排除最开始和最末尾的空字符串（不考虑最开始或最末尾出现分隔符的情况）*/
                        if(!_.trim(val) && index !== 0 && index !== (valueArr.length -1)) {
                            flag =  true;
                            return;
                        }
                    });
                    return flag;
                };
                var validator = function (value) {
                    var valueArr = (value || '').split(splitter);
                    if (!value || !isEmpty(valueArr)) {
                        ctrl.$setValidity('nswnoempty', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswnoempty', false);
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
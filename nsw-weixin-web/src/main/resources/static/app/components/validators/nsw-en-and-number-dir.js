/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswEnNumber", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /([0-9]*[a-zA-Z]+[0-9]*)*/;

                var validator = function (value) {
                    value = value||'';
                    var isValid;
                    if(value.match(regexp)&&value.match(regexp)[0]===value){
                        isValid = true;
                    }else{
                        isValid = false;
                    }
                    if (!value || isValid) {
                        ctrl.$setValidity('nswennumber', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswennumber', false);
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
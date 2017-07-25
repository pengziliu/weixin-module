
/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
    "use strict";

    angular.module('platform').directive("nswNotSymbol", [function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl) {
                    return;
                }
                var regexp = /[^!@#$%^&*()+{}":><?.,`'\\\/！=\]\[【】，。、；‘、\-’@#￥%……&*（）——+？》《：“~]*/g;
                var validator = function (value) {
                    value = value||'';
                    var isValid;
                    if(value.match(regexp)&&value.match(regexp)[0]===value){
                        isValid = true;
                    }else{
                        isValid = false;
                    }
                    if (!value || isValid) {
                        ctrl.$setValidity('nswnotsymbol', true);
                        return value;
                    } else {
                        ctrl.$setValidity('nswnotsymbol', false);
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
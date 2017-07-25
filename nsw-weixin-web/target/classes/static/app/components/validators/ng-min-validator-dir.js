/**
 * Created by jiangw on 2016/9/27.
 */
(function(angular){
    "use strict";
    angular.module('platform').directive('ngMin', [function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var minValidator = function minValidator(value) {
                    var min = scope.$eval(attrs.ngMin) || 0;
                    if (!_.isEmpty(value) && value < min) {
                        ctrl.$setValidity('ngMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMin', true);
                        return value;
                    }
                };

                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);

                attrs.$observe('ngmin', function () {
                    minValidator(ctrl.$viewValue);
                });
            }
        };
    }]);
})(angular);
(function (angular) {
    "use strict";

    angular.module('platform').directive('nswRadioBox', [function () {
        return {
            restrict: 'AE',
            scope: {
                label: '@'
            },
            require: ['ngModel', '?ngValue'],
            templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-radio-box.html',
            link: function (scope, element, attrs, ctrls) {
                var ctrl = ctrls[0];

                scope.$parent.$watch(attrs.ngValue, function (val) {
                    scope.value = val;
                });

                ctrl.$render = function () {
                    scope.model = ctrl.$viewValue;
                };

                scope.useValue = function useValue() {
                    scope.model = scope.value;
                    if (!_.isUndefined(scope.model)) {
                        ctrl.$setViewValue(scope.model);
                    }
                };

                scope.getStateClass = function getStateClass() {
                    return ctrl.$viewValue === scope.value && 'checked';
                };
            }
        };
    }]);
}(angular));
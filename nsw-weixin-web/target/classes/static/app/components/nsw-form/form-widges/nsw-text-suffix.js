(function (angular) {
    "use strict";

    angular.module('platform').directive('nswTextSuffix', ['$timeout', 'platformWordCountSvc', function ($timeout, platformWordCountSvc) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-text-suffix.html',
            link: function (scope, element, attrs, ctrl) {
                scope.size = attrs.size ||'size-md';
                scope.maxCount = attrs.nswMaxLength;
                scope.isOverCount = false;

                var updateCounter = function updateCounter() {
                    scope.inputCount = platformWordCountSvc.count(ctrl.$viewValue||'');
                    scope.isOverCount = scope.inputCount > scope.maxCount;
                };

                var onElementKeyUp = function onElementKeyUp() {
                    if (ctrl.$error.hasOwnProperty('nswmaxlength')) {
                        $timeout(function () {
                            updateCounter();
                        });
                    }
                };


                ctrl.$render = function () {
                    scope.model = ctrl.$viewValue;
                    updateCounter();
                };

                scope.valueChanged = function valueChanged() {
                    ctrl.$setViewValue(scope.model);
                    onElementKeyUp();
                };

                scope.clearValue = function clearValue() {
                    scope.model = '';
                    ctrl.$setViewValue(null);
                    onElementKeyUp();
                };

                scope.$evalAsync(function () {
                    element.on('keyup', onElementKeyUp);
                    updateCounter();
                });
            }
        };
    }]);
}(angular));
(function (angular) {
    "use strict";

    angular.module('platform').directive('nswButton', ['$timeout', 'platformWordCountSvc', function ($timeout, platformWordCountSvc) {
        return {
            restrict: 'AE',
            require: 'ngModel',
           // scope:true,
            templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-text.html',
            link: function (scope, element, attrs, ctrl) {
                scope.size = attrs.size ||'size-md';
                var getInputElement = function getInputElement() {
                    return $(element.find('.form-control')[0]);
                };

                var updateCounter = function updateCounter() {
                    var inputElement = getInputElement();
                    if (!inputElement) {
                        scope.inputCount = platformWordCountSvc.count(ctrl.$viewValue||'');
                        return;
                    }else{
                        scope.inputCount = platformWordCountSvc.count(inputElement.val() || ctrl.$viewValue);
                    }
                    scope.maxCount = attrs.nswMaxLength;
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
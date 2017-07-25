(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswText', ['$timeout', 'platformWordCountSvc', function ($timeout, platformWordCountSvc) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				inputBlurFun: "&",
				hasCounter: '@'
			},
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-text.html',
			link: function (scope, element, attrs, ctrl) {
				scope.hasWordCounter = scope.hasCounter !== 'false';
				scope.hideClearBtn = attrs.$attr.hideClearBtn;
				scope.size = attrs.size || 'size-md';
				scope.placeholder = attrs.placeholder||'';

				scope.isOverCount = false;  // 是否超过字数
				scope.maxCount = attrs.nswMaxLength;

				var getInputElement = function getInputElement() {
					return $(element.find('.form-control')[0]);
				};

				var updateCounter = function updateCounter() {
					var inputElement = getInputElement();
					if (!inputElement) {
						scope.inputCount = platformWordCountSvc.count(ctrl.$viewValue || '');
						return;
					} else {
						scope.inputCount = platformWordCountSvc.count(inputElement.val() || ctrl.$viewValue);
					}
					scope.isOverCount = scope.inputCount > scope.maxCount;
				};
				
				var onElementKeyUp = function onElementKeyUp() {
					// if (ctrl.$error.hasOwnProperty('nswmaxlength')) {
						$timeout(function () {
							updateCounter();
						});
					// }
				};
				
				var setReadonly = function setReadonly(){
					if(!_.isUndefined(attrs.readonly)){
						getInputElement().attr('readonly', true);
					}
				};
				
				ctrl.$render = function () {
					scope.model = ctrl.$viewValue;
					updateCounter();
                    if (!(scope.$root && (scope.$$phase || scope.$root.$$phase))) {
                        scope.$apply();
                    }
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
				
				attrs.$observe('readonly',function () {
					setReadonly();
				});
				
				setReadonly();
				scope.$evalAsync(function () {
					element.on('keyup', onElementKeyUp);
					updateCounter();
				});
			}
		};
	}]);
}(angular));
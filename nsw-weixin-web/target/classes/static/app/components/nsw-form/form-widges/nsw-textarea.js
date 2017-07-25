(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswTextarea', ['$timeout', 'platformWordCountSvc', function ($timeout, platformWordCountSvc) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				rows: '@'
			},
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-textarea.html',
			link: function (scope, element, attrs, ctrl) {
				scope.size = attrs.size || 'size-md';
				scope.maxCount = attrs.nswMaxLength;
				scope.isOverCount = false;
				scope.placeholder = attrs.placeholder || '';
				
				var updateCounter = function updateCounter() {
					scope.inputCount = platformWordCountSvc.count(ctrl.$viewValue || '');
					//scope.maxCount = attrs.nswMaxLength;
					
					var $counter = element.find('.input-counter');
					var right = ($counter.width() + 3) * -1,
						minRight = -70;
					
					right = _.min([minRight, right]);
					$counter.css('right', right);
					
					scope.isOverCount = scope.inputCount > scope.maxCount;
				};
				
				var onElementKeyUp = function onElementKeyUp() {
					$timeout(function () {
						updateCounter();
					});
				};
				
				
				ctrl.$render = function () {
					scope.model = ctrl.$viewValue;
					updateCounter();
				};
				
				scope.valueChanged = function valueChanged() {
					ctrl.$setViewValue(scope.model);
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
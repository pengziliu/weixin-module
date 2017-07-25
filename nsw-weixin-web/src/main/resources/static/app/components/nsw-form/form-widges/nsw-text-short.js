(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswTextShort', [function () {
		return {
			restrict: 'AE',
			require: 'ngModel',
			replace:true,
			scope: {
				size: '@',
				shortTitle: '@'
			},
			transclude: true,
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-text-short.html',
			link: function (scope, element, attr, ctrl) {
				scope.options = {};
				scope.options.size = scope.size || 'size-sm';
				scope.maxCount = attr.nswMaxLength;
				scope.setViewValue = function setViewValue() {
					ctrl.$setViewValue(scope.options.shortModel);
				};
				
				ctrl.$render = function render() {
					scope.options.shortModel = ctrl.$viewValue;
					scope.hasShortTitle = !!ctrl.$viewValue;
				};
				
				var onClick = function (/*e*/) {
					if(scope.hasShortTitle){
						$(element).off('click', onClick);
					}
					if (!scope.hasShortTitle) {
						scope.hasShortTitle = true;
						scope.$apply();
						$(element).off('click', onClick);
					}
				};
				
				$(element).on('click', onClick);
			}
		};
	}]);
}(angular));
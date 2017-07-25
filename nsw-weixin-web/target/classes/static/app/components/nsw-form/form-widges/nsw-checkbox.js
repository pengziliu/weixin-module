(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswCheckbox', [function () {
		return {
			restrict: 'AE',
			scope: {
				label: '@',
				nswChecked: '='
			},
			require: '?ngModel',
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-checkbox.html',
			link: function (scope, element, attrs, ctrl) {
				
				if (ctrl) {
					ctrl.$render = function () {
						scope.model = !!ctrl.$viewValue;
					};
				} else {
					scope.$watch('nswChecked', function (val) {
						scope.model = val;
					});
				}
				
				scope.valueChanged = function valueChanged() {
					if (ctrl) {
						scope.model = !scope.model;
						ctrl.$setViewValue(scope.model);
					}
				};
				
				scope.getStateClass = function getStateClass() {
					return scope.model && 'checked';
				};
			}
		};
	}]);
}(angular));
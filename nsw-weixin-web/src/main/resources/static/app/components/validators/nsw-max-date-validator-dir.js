/**
 * Created by zengl on 2016/9/26.
 */
;(function (angular) {
	'use strict';
	
	angular.module('platform')
		.directive('nswMaxDate', ['platformDateSvc', function (platformDateSvc) {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, element, attrs, ngModel) {
					if (!ngModel) {
						return;
					}
					
					var validator = function (value) {
						var maxValue = platformDateSvc.stringToDate(attrs.nswMaxDate);
						if (value) {
							if (platformDateSvc.stringToDate(value) < maxValue) {
								ngModel.$setValidity('nswmaxdate', true);
							} else {
								ngModel.$setValidity('nswmaxdate', false);
							}
						} else {
							ngModel.$setValidity('nswmaxdate', true);
						}
						return value;
					};
					
					ngModel.$parsers.unshift(validator);
					ngModel.$formatters.push(validator);
					
					attrs.$observe('nswMaxDate', function () {
						validator(ngModel.$viewValue);
					});
				}
			};
		}]);
	
})(angular);
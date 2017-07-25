/**
 * Created by zengl on 2016/9/26.
 */
;(function (angular) {
	'use strict';
	
	angular.module('platform')
		.directive('nswMinDate', ['platformDateSvc', function (platformDateSvc) {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, element, attrs, ngModel) {
					if (!ngModel) {
						return;
					}
					
					var validator = function (value) {
						var minValue = platformDateSvc.stringToDate(attrs.nswMinDate);
						
						if (value) {
							if (platformDateSvc.stringToDate(value) > minValue) {
								ngModel.$setValidity('nswmindate', true);
							} else {
								ngModel.$setValidity('nswmindate', false);
							}
						} else {
							ngModel.$setValidity('nswmindate', true);
						}
						return value;
					};
					
					ngModel.$parsers.unshift(validator);
					ngModel.$formatters.push(validator);
					
					attrs.$observe('nswMinDate', function () {
						validator(ngModel.$viewValue);
					});
				}
			};
		}]);
	
})(angular);
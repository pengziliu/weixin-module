/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";
	
	angular.module('platform').directive("nswLatitude", [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				
				var regexp = /^0$|^-?0\.\d*[1-9]$|^-?[1-9](\.\d*[1-9])?$|^-?[1-8]\d(\.\d*[1-9])?$|^-?90$/;
				
				var validator = function (value) {
					var isValid = regexp.test(value);
					
					if (!value || isValid) {
						ctrl.$setValidity('nswlatitude', true);
						return value;
					} else {
						ctrl.$setValidity('nswlatitude', false);
						return value;
					}
				};
				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);
			}
		};
		
	}]);
}(angular));
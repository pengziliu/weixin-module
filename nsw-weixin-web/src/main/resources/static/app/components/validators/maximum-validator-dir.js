/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswMaximum", [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				var validator = function (value) {
					var _value = value;
					var maximum = Number(attr.nswMaximum).valueOf() || 0;
					if (_value <= maximum) {
						ctrl.$setValidity('nswmaximum', true);
						return value;
					} else {
						ctrl.$setValidity('nswmaximum', false);
						return value;
					}
				};
				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);
				attr.$observe('nswMaximum', function () {
					validator(ctrl.$viewValue);
				});
			}
		};

	}]);
}(angular));
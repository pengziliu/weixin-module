/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive('maxWord', [function () {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (!ctrl) {
					return;
				}
				var splitter =/[\|\|]+|[,，]+/; //line: ignore
				var replaceChar =/[\|\|]+|[,，]+/g; //line: ignore


				var validator = function (value) {
					var maxWord = parseInt(attr.maxWord) || 0;
					var count = (value || '').split(splitter).length;
					if (maxWord === 0 || count <= maxWord ) {
						ctrl.$setValidity('maxword', true);
						return value;
					} else {
						ctrl.$setValidity('maxword', false);
						return value;
					}
				};
				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);

				ctrl.$viewChangeListeners.push(function(){
					var value = ctrl.$viewValue;
					if(value) {
						value = value.replace(replaceChar,',');
						ctrl.$setViewValue(value);
					}
				});

				attr.$observe('maxword', function () {
					validator(ctrl.$viewValue);
				});
			}
		};
	}]);
}(angular));
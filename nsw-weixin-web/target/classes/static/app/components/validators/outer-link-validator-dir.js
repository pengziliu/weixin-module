/**
 * Created by jiangw on 2016/9/27.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('nswOuterLink', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				element.on('keyup', function () {
					// var regexp = /^www\./i;
					var regexp = /(^www\.)|(\w\.com)|(\w\.cn)|(\w\.net)|(\w\.org)|(\w\.edu)|(\w\.gov)/i,
						httpRefg = /^http/i;
					var keyCode = event.keyCode;
					if (keyCode !== 8 && !httpRefg.test(ctrl.$viewValue)) {
						if (regexp.test(ctrl.$viewValue)) {
							ctrl.$setViewValue('http://' + ctrl.$viewValue);
							ctrl.$render();
						}
					}
				});
			}
		};
	}]);
})(angular);
/**
 * Created by jiangw on 2016/9/27.
 */
(function(angular){
	"use strict";
	// 正负整数和0 -> 非小数
	angular.module('platform').directive('nswInteger', [function(){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				var integerValidator = function integerValidator(value) {
					var regExp = /^-?\d+$/;
					if (!_.isEmpty(value) && !regExp.test(value)) {
						ctrl.$setValidity('nswInteger', false);
						return undefined;
					} else {
						ctrl.$setValidity('nswInteger', true);
						return value;
					}
				};

				ctrl.$parsers.push(integerValidator);
				ctrl.$formatters.push(integerValidator);

				attrs.$observe('nswinteger', function () {
					integerValidator(ctrl.$viewValue);
				});
			}
		};
	}]);
})(angular);
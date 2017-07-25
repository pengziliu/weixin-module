/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswNumber",[function(){
			return{
				restrict:'A',
				require:'?ngModel',
				link:function(scope,element,attr,ctrl){
					if(!ctrl){
						return;
					}

					var regexp = /^-?[0-9]{1}[0-9]*\.?[0-9]*$/;

					var validator = function (value){
						var isValid = regexp.test(value);

						if(!value || isValid){
							ctrl.$setValidity('nswnumber',true);
							return value;
						}else{
							ctrl.$setValidity('nswnumber',false);
							return value;
						}
					};
					ctrl.$formatters.push(validator);
					ctrl.$parsers.unshift(validator);
					attr.$observe('nswNumber', function () {
						validator(ctrl.$viewValue);
					});
				}
			};

	}]);
}(angular));
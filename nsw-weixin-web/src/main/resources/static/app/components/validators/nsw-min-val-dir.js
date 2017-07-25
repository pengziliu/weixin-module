/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswMinVal",[function(){
			return{
				restrict:'A',
				require:'?ngModel',
				link:function(scope,element,attr,ctrl){
					if(!ctrl){
						return;
					}
					var validator = function (value){
						var intVal = Number(value )||0;
						var nswMaxVal = Number(attr.nswMinVal)|| 0;

						if(intVal>=nswMaxVal){
							ctrl.$setValidity('nswminval',true);
							return value;
						}else{
							ctrl.$setValidity('nswminval',false);
							return value;
						}
					};
					ctrl.$formatters.push(validator);
					ctrl.$parsers.unshift(validator);
					attr.$observe('nswMinVal', function () {
						validator(ctrl.$viewValue);
					});
				}
			};

	}]);
}(angular));
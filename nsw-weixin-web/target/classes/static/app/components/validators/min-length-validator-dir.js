/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive("nswMinLength",[function(){
			return{
				restrict:'A',
				require:'?ngModel',
				link:function(element,scope,attr,ctrl){
					if(!ctrl){
						return;
					}
				
					var validator = function (value){
						var truelength = 0;
						var nswMinLength = parseInt(attr.nswMinLength)|| 0;
						var totalCount =0;
						value = value ||'';
						for(var i=0; i<value.length; i++){
							var c = value.charCodeAt(i);
							if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
								totalCount++;
							}
							else{
								totalCount+=2;
							}

						}
						truelength = totalCount;
						if(truelength===0||totalCount>=nswMinLength){
							ctrl.$setValidity('nswminlength',true);
						}else{
							ctrl.$setValidity('nswminlength',false);
						}
						return value;
					};
					ctrl.$formatters.push(validator);
					ctrl.$parsers.unshift(validator);

					attr.$observe('nswminlength', function () {
						validator(ctrl.$viewValue);
					});
				}
			};

		}]);
}(angular));
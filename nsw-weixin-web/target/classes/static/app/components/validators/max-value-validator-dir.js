/**
 * Created by zengl on 2016/9/26.
 */
;(function(angular){
	'use strict';

	angular.module('platform')
		.directive('nswMaxValue', function(){
			return {
				restrict : 'A',
				require : 'ngModel',
				link : function(scope, element, attrs, ngModel){
					if(!ngModel){
						return ;
					}
					var maxValue = parseInt(attrs.nswMaxValue);
					maxValue = isNaN(maxValue)?0:maxValue;

					var validator = function(value){
						value = value || '';
						if(value){
							var tempValue = Number(value);// parseInt对后面是字母会忽略
							if(tempValue<=maxValue){
								ngModel.$setValidity('maxvalue', true);
							}else{
								ngModel.$setValidity('maxvalue', false);
							}
						}else{
							ngModel.$setValidity('maxvalue', true);
						}
						return value;
					};

					ngModel.$parsers.unshift(validator);
					ngModel.$formatters.push(validator);

					attrs.$observe('maxvalue', function(){
						validator(ngModel.$viewValue);
					});
				}
			};
		});

})(angular);
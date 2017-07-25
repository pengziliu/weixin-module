/**
 * reg exp validator
 * Checking reg exp of string
 * useage
 * Validate url
 * <input type="text" nsw-regexp=''/>
 */
(function (angular) {
	"use strict";

	angular.module('platform').directive('maxWordLength', [function () {
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
					value = value ||[];
					var maxWord = parseInt(attr.maxWordLength) || 0;
					var maxWordLength = parseInt(attr.wordLength) || 32;
					var validatorWordLength = true;
						value.forEach(function(word){
						var valueMax = word ||'';
						var totalCount =0;
						for(var i=0; i<word.length; i++){
							var c = valueMax.charCodeAt(i);
							if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
								totalCount++;
							}
							else{
								totalCount+=2;
							}
						}
						if(totalCount>maxWordLength){
							validatorWordLength = false;
							return ;
						}
					});
					var count = value.length;
					if ((maxWord === 0 || count <= maxWord )&& validatorWordLength) {
						ctrl.$setValidity('maxwordlength', true);
						return value;
					} else {
						ctrl.$setValidity('maxwordlength', false);
						return value;
					}
				};
				ctrl.$formatters.push(validator);
				ctrl.$parsers.unshift(validator);

				ctrl.$viewChangeListeners.push(function(){
					var value = ctrl.$viewValue;
				});

				attr.$observe('maxWordLength', function () {
					validator(ctrl.$viewValue);
				});
			}
		};
	}]);
}(angular));
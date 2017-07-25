(function(angular){
    'use strict';
    
    var platform = angular.module('platform');
    
    platform.directive('nswWordLength', [
        function(){
            return {
                restrict: 'A',
                require: '?ngModel',
                link : function(scope, el, attr, ctrl){
    
                    var wordLength = angular.isDefined(attr.nswWordLength);
                    var splitter =/[\|]+|[,，]+/; //line: ignore
                    
                    // 验证单词长度 true 验证通过，false 验证失败
                    var validateLength = function(valueMax, nswMaxLength){
                        var totalCount =0;
                        for(var i=0; i<valueMax.length; i++){
                            var c = valueMax.charCodeAt(i);
                            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
                                totalCount++;
                            }
                            else{
                                totalCount+=2;
                            }
                        }
                        return totalCount<=nswMaxLength;
                    };
                    // 验证器
                    var wordLengthValidator = function(value){
                        var wl = parseInt(attr.nswWordLength) || 0;
                        var words = (value || '').split(splitter);  // 单词个数
                        var isError = false;
                        _.forEach(words, function(word){
                            return isError = validateLength(word, wl);
                        });
                        ctrl.$setValidity('wordlength', isError);
                        return value;
                    };
    
                    if( wordLength ){
                        ctrl.$formatters.push(wordLengthValidator);
                        ctrl.$parsers.unshift(wordLengthValidator);
                    }
    
                    attr.$observe('nswWordLength', function () {
                        wordLengthValidator(ctrl.$viewValue);
                    });
                }
            }
        }
    ]);
    
})(angular);
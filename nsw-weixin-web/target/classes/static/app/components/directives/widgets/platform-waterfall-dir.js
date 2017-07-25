(function (angular) {
    "use strict";
    angular.module('platform').directive('platformWaterfall', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {

                //  element.css({visibility:"hidden"});
                var waterfall = function waterfall() {
                    var maxHeight = 0;
                    var $nodes = element.find('li'),
                        nodeWidth = $nodes.outerWidth();
                    var colCount = 3;
                    for (var i = 0; i < $nodes.length; i++) {
                        if (i < colCount) {
                            $($nodes[i]).css({
                                top: '0px',
                                left: i * (nodeWidth + 17) + 'px'
                            });
                        } else {
                            $($nodes[i]).css({
                                top: $($nodes[i - colCount]).position().top + $($nodes[i - colCount]).outerHeight() + 12 + 'px',
                                left: $($nodes[i - colCount]).position().left
                            });
                        }
                        if ($($nodes[i]).position().top + $($nodes[i]).outerHeight() > maxHeight) {
                            maxHeight = $($nodes[i]).position().top + $($nodes[i]).outerHeight();
                        }
                    }

                    element.css({height: maxHeight + 'px', visibility: 'visible'});



                };
                var watcher = scope.$watch('dataList', function (newVal) {
                    if (newVal && newVal.length) {
                        $timeout(function () {
                            waterfall();
                        }, 10);
                    }
                }, true);
                scope .$on('ngRepeatFinished', function () {
                    //下面是在table render完成后执行的js
                    waterfall();
                });

                scope.$on('destory', function () {
                    watcher();
                });
            }
        };
    }]).directive('onFinishRenderFilters', ['$timeout','nswGlobals',function ($timeout,nswGlobals) {
        return {
            restrict: 'A',
            link: function(scope) {
                //TODO
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    },50);
                }
            }
        };
    }]);
}(angular));
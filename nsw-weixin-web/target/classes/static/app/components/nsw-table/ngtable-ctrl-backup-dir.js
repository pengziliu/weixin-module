/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular){
    "use strict";
    angular.module('platform').directive('ngtableCtrlBackup', [
        function() {
            return {
                scope: {},
                replace: true,
                template: '<div class="table-backup" ng-click="_backUp()"></div>',
                link: function(scope, element) {

                    var getScrollTop = function getScrollTop() {
                        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    };

                    var bindScroll = function bindScroll() {
                        $(window).scroll(showScrollBtn);
                    };

                    var showScrollBtn = function showScrollBtn() {
                        if (getScrollTop() > $(window).height()) {
                            element.show();
                        } else {
                            element.hide();
                        }
                    };

                    scope._backUp = function backUp() {
                        $('html, body').animate({
                            scrollTop: 0
                        }, "fast");
                    };

                    bindScroll();

                }
            };
        }]);
})(angular);
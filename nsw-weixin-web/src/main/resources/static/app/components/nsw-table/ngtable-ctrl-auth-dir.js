/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular){
    "use strict";
    angular.module('platform').directive('ngtableCtrlAuth', ['platformNswAuthSvc',
        function(platformNswAuthSvc) {
            return {
                scope: {
                    nswClick: '&'
                },
                link: function(scope, element, attrs) {

                    attrs.ngtableCtrlAuth = attrs.ngtableCtrlAuth || '';

                    var checkAuth = function checkAuth() {
                        return platformNswAuthSvc.getAuth(attrs.ngtableCtrlAuth);
                    };

                    var bindClick = function bindClick() {
                        if (checkAuth()) {
                            element.css("cursor", "pointer");
                            element.click(function () {
                                scope.nswClick();
                            });
                        }
                    };

                    scope.$evalAsync(function() {
                        bindClick();
                    });

                }
            };
        }]);
})(angular);
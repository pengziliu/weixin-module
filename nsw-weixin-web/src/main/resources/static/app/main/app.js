/*global angular*/
(function (angular) {
	"use strict";
	angular.module('app', ['platform', 'account', 'menu', 'materials', 'autoReply', 'member', 'massMessage', 'message', 'qrCode', 'messageTemplate', 'log', 'course', 'coursereg'])
		
		.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.when("", '/wechat');
			$stateProvider
				.state('wechat', {
					url: '/wechat',
					templateProvider: ['$http', '$q', 'platformModalSvc', 'platformNswAuthSvc', '$location', '$sessionStorage',
						function ($http, $q, platformModalSvc, platformNswAuthSvc, $location, $sessionStorage) {
							var projId = $location.$$search.projId || ($sessionStorage.selectedProject || {}).id;
							if (projId) {
								var defer = $q.defer();
								var loading = platformModalSvc.showLoadingTip('页面加载中....');
								var promiseAuth = platformNswAuthSvc.loadAuthData();
								$http.get(globals.basAppRoute + 'main/partials/main-view.html')
									.then(function (response) {
										defer.resolve(response.data);
									});
								
								$q.all(promiseAuth, defer.promise).then(function () {
									loading.close();
								});
								return defer.promise;
							}
							
						}]
				})
				.state('switchProject', {
					url: '/switchProject',
					controller: 'switchProjectCtrl',
					templateUrl: globals.basAppRoute + 'main/partials/switch-project-view.html'
				});
		}]);
	
	/*处理屏幕*/
	var headerHeight = $(".c-header").outerHeight();
	var screenHeight = $(window).outerHeight();
	var footerHeight = $(".c-footer").outerHeight();
	$(".c-container,.c-menu-container").css("minHeight", screenHeight - headerHeight - footerHeight + 'px');
}(angular));

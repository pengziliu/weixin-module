/**
 * Created by yaoyc on 2017/5/2.
 */
(function (angular) {
	"use strict";
	angular.module('log', ['platform'])
		.config(['$stateProvider', '$urlRouterProvider',
			function ($stateProvider) {
				$stateProvider
					.state('wechat.log', {
						url:'/log-list',
						templateUrl:globals.basAppRoute+'log/partials/log-list.html',
						controller:'logListCtrl'
					});
			}]);
})(angular);

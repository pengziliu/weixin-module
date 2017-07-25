/*global angular*/
(function(angular){
	"use strict";
	angular.module('coursereg',['platform']).config(['$stateProvider',function ($stateProvider){
		$stateProvider.state('wechat.coursereg', {
			url: '/coursereg',
			templateUrl:  globals.basAppRoute+'course-reg/partials/course-reg.html',
			controller: 'courseRegCtrl'
		}).state('wechat.coursereg.list', {
			url: '/list',
			templateUrl:  globals.basAppRoute+'course-reg/partials/course-reg-list.html',
			controller: 'courseRegListCtrl'
		}).state('wechat.coursereg.detail', {
			url: '/detail/:id',
			templateUrl:  globals.basAppRoute+'course-reg/partials/course-reg-detail.html',
			controller: 'courseRegDetailCtrl'
		});
	}]);
}(angular));
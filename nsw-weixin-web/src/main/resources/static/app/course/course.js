/*global angular*/
(function(angular){
	"use strict";
	angular.module('course',['platform']).config(['$stateProvider',function ($stateProvider){
		$stateProvider.state('wechat.course', {
			url: '/course',
			templateUrl:  globals.basAppRoute+'course/partials/course.html',
			controller: 'courseCtrl'
		}).state('wechat.course.courseList', {
			url: '/list',
			templateUrl:  globals.basAppRoute+'course/partials/course-list.html',
			controller: 'courseListCtrl'
		}).state('wechat.course.courseDetail', {
			url: '/detail/:id',
			templateUrl:  globals.basAppRoute+'course/partials/course-detail.html',
			controller: 'courseDetailCtrl'
		}).state('wechat.course.create', {
			url: '/detail',
			templateUrl:  globals.basAppRoute+'course/partials/course-detail.html',
			controller: 'courseDetailCtrl'
		});
	}]);
}(angular));
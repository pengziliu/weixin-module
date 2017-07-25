(function (angular) {
	"use strict";
	
	angular.module('course').controller('courseListCtrl', ['$scope', 'basListCtrlSvc', 'courseDataSvc',
		function ($scope, basListCtrlSvc, courseDataSvc) {
			basListCtrlSvc.createInstance($scope, courseDataSvc, {
				detailState: 'wechat.course.courseDetail'
			});
			
			$scope.searchData();
			
			$scope.edit = function edit(item) {
				courseDataSvc.setCurrentItem(item);
				$scope.goState($scope.detailState, {params: {id: item.id}});
			};
		}]);
}(angular));
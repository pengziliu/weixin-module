(function (angular) {
	"use strict";
	
	angular.module('coursereg').controller('courseRegDetailCtrl', ['$scope', 'NgTableParams', 'basDetailCtrlSvc', 'courseRegDataSvc',
		function ($scope, NgTableParams, basDetailCtrlSvc, dataSvc) {
			basDetailCtrlSvc.createInstance($scope, dataSvc, {
				notCopyCurrent: true,
				listState: 'wechat.coursereg.list',
				tabs: {
					baseInfo: {title: '基本信息'},
					courseHistory: {title: '课程记录'}
				}
			});
			
			
			if ($scope.params.id) {
				$scope.setCurrentItem($scope.params.id);
			} else if ($scope.currentItem.id) {
				$scope.setCurrentItem($scope.params.id);
			}
			
			$scope.showCourse = function showCourse(course) {
				$scope.goState('wechat.course.courseDetail',{params:{id:course.id}});
			};
			
			var oldId = '';
			$scope.historySearchOptions = {
				totalRows: 0,
				pageNum: 1, //currentPage
				totalPages: 0,
				pageSize: 20,
				maxSize: 5
			};
			
			$scope.tableParams = new NgTableParams({}, {
				counts: [],
				dataset: []
			});
			
			function searchHistoryData() {
				$scope.historySearchOptions.openid = $scope.currentItem.openid;
				$scope.historySearchOptions.appId = $scope.currentItem.appId;
				$scope.historySearchOptions.pageNum = 1;
				$scope.historySearchOptions.totalPages = 1;
				
				dataSvc.searchCourseHistory($scope.historySearchOptions).then(function (res) {
					$scope.dataList = res.listData;
					$scope.historySearchOptions.totalPages = res.pageCount;
					$scope.historySearchOptions.totalRows = res.totalCount;
					
					$scope.tableParams.count($scope.dataList.length);
					$scope.tableParams.settings({dataset: $scope.dataList});
				});
			}
			
			function currentItemChanged() {
				if ($scope.currentItem.id === oldId) {
					return;
				}
				oldId = $scope.currentItem.id;
				searchHistoryData();
			}
			
			dataSvc.registerCurrentItemChanged(currentItemChanged);
			
			$scope.$on('$destroy', function () {
				dataSvc.unregisterCurrentItemChanged(currentItemChanged);
			});
		}]);
}(angular));
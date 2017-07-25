(function(angular) {
	"use strict";

	angular.module('course').controller('courseDetailCtrl', ['$scope', 'basDetailCtrlSvc', 'courseDataSvc', 'NgTableParams',
		function($scope, basDetailCtrlSvc, courseDataSvc, NgTableParams) {

			basDetailCtrlSvc.createInstance($scope, courseDataSvc, {
				notCopyCurrent: true,
				listState: 'wechat.course.courseList',
				tabs: {
					baseInfo: {
						title: '基本信息'
					},
					regHistory: {
						title: '报名记录'
					}
				}
			});
			if ($scope.currentWechtInfo) {
				console.log($scope.currentWechtInfo);
				$scope.currentItem.creater = $scope.currentWechtInfo.nick_name;
			}

			if ($scope.params.id) {
				$scope.setCurrentItem($scope.params.id);
			} else if ($scope.currentItem.id) {
				$scope.setCurrentItem($scope.params.id);
			} else {
				$scope.create();
			}


			/////////////////////			
			$scope.showMember = function showMember(course) {
				$scope.goState('wechat.coursereg.detail', {
					params: {
						id: course.id
					}
				});
			};

			var oldId = '';
			$scope.regSearchOptions = {
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

			function searchRegData() {
				$scope.regSearchOptions.activeId = $scope.currentItem.id;
				$scope.regSearchOptions.pageNum = 1;
				$scope.regSearchOptions.totalPages = 1;

				courseDataSvc.searchCourseRegHistory($scope.regSearchOptions).then(function(res) {
					$scope.dataList = res.listData;
					$scope.regSearchOptions.totalPages = res.pageCount;
					$scope.regSearchOptions.totalRows = res.totalCount;

					$scope.tableParams.count($scope.dataList.length);
					$scope.tableParams.settings({
						dataset: $scope.dataList
					});
				});
			}

			function currentItemChanged() {
				if ($scope.currentItem.id === oldId) {
					return;
				}
				oldId = $scope.currentItem.id;
				searchRegData();
			}

			courseDataSvc.registerCurrentItemChanged(currentItemChanged);

			$scope.$on('$destroy', function() {
				courseDataSvc.unregisterCurrentItemChanged(currentItemChanged);
			});

		}
	]);
}(angular));
(function (angular) {
	"use strict";
	
	angular.module('coursereg').controller('courseRegListCtrl', ['$scope', 'basListCtrlSvc', 'courseRegDataSvc',
		function ($scope, basListCtrlSvc, dataSvc) {
			basListCtrlSvc.createInstance($scope, dataSvc, {
				detailState:'wechat.coursereg.detail'
			});
			
			
			$scope.searchData();
			$scope.edit = function edit(item) {
				dataSvc.setCurrentItem(item);
				$scope.goState($scope.detailState, {params: {id: item.id}});
			};
		}]);
}(angular));
/**
 * Created by yaoyc on 2017/5/2.
 */
(function (angular) {
	"use strict";
	angular.module('log').controller('logListCtrl', ['$scope', 'basListCtrlSvc', 'platformModalSvc', 'logSvc','platformDateSvc',
		function ($scope, basListCtrlSvc, platformModalSvc, logSvc,platformDateSvc) {
			basListCtrlSvc.createInstance($scope, logSvc, {
				detailState:'wechat.log.detail'
			});
			$scope.range = {
				start:platformDateSvc.dateRange({range:3})
			};
			$scope.searchOptions.start = $scope.range.start||'';
			$scope.getNewList = function getNewList(data){
				if(!data){
					return;
				}
				$scope.searchOptions.start = data.start;
				$scope.searchOptions.end = data.end;
			};
			$scope.searchData();


		}]);
})(angular);
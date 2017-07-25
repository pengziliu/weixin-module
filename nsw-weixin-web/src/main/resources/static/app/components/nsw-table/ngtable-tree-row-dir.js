/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('ngtableTreeRow', [
		function () {
			return {
				replace: true,
				require: 'ngModel',
				transclude: true,
				template: '<tr ng-show="showData(rowData)" data-ng-transclude></tr>',
				controller: ['$scope', function ($scope) {
					$scope.toggleData = function (item, collapsed) {
						//var _pid = $scope.$parent._pid;
						var _pid = $scope.originCollapsed._pids;
						if (!collapsed) {
							_pid[item._id] = item._id;
						} else {
							_pid[item._id] = -1;
						}
						$scope.originCollapsed[item._id] = collapsed;
					};
				}],
				link: function (scope, element, attrs, ctrl) {
					
					scope.$parent._pid = {};
					scope.showData = function (item) {
						//var _pid = scope.$parent._pid;
						var _pid = scope.originCollapsed._pids;
						var flag = true;
						_.forEach(_pid, function (itemel, k) {
							var arr;
							if (item.path) {
								arr = item.path.split(',');
							}
							_.forEach(arr, function (itemel2, i) {
								if (arr[i] === _pid[k]) {
									flag = false;
								}
							});
						});
						return flag;
					};
					
					ctrl.$render = function $render() {
						scope.rowData = ctrl.$viewValue;
					};
				}
			};
		}]);
})(angular);
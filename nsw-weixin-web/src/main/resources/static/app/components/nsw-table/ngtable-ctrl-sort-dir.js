/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('ngtableCtrlSort', [
		function () {
			return {
				scope: true,
				template: '<span>' +
				'<i class="page-icon icon-arrowup" ng-if="row.indexType == 1 || row.indexType == 2"' +
				'   ng-click="_sortUp()"></i>' +
				'<i class="page-icon icon-arrowdown" ng-if="row.indexType == 2 || row.indexType == -1"' +
				'   ng-click="_sortDown()"></i>' +
				'</span>',
				link: function (scope, element, attrs) {
					
					attrs.sortUp = attrs.sortUp || '';
					attrs.sortDown = attrs.sortDown || '';
					
					var sortRun = function sortRun(attrsSort) {
						if (attrsSort) {
							scope.$eval(attrsSort);
						}
					};
					
					scope._sortUp = function sortUp() {
						sortRun(attrs.sortUp);
					};
					
					scope._sortDown = function sortDown() {
						sortRun(attrs.sortDown);
					};
				}
			};
		}]);
})(angular);

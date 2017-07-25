/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('ngtableToolbarCheck', [
		function () {
			return {
				scope: {
					selector: '=',
					selectAll: '&',
					isAllSelected: '&',
					reverseSelect: '&'
				},
				template: '<div nsw-checkbox="" ng-click="selectAll()" class="clearFix nsw-tool-checkbox" nsw-checked="isAllSelected()"></div>' +
				'<a href="javascript:;" ng-click="selectAll()">全选</a>' +
				'<span>|</span>' +
				'<a href="javascript:;" ng-click="reverseSelect()">反选</a>',
				link:function (scope) {
					if(scope.selector){
						scope.selectAll = scope.selector.selectAll;
						scope.isAllSelected = scope.selector.isAllSelected;
						scope.reverseSelect = scope.selector.reverseSelect;
					}
				}
			};
		}]);
})(angular);

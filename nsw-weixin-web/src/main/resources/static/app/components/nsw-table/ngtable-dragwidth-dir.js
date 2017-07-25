/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular) {
	"use strict";
	angular.module('platform').directive('tableDragwidth', [
		function () {
			return {
				scope: true,
				link: function (scope, element, attrs) {
					
					attrs.notIndex = attrs.notIndex || '1,2';
					var thAttr;
					var objParams = {
						element: {},
						width: 0,
						pagex: 0
					};
					
					var tableMouseMove = function tableMouseMove(e) {
						var width = objParams.width + (e.pageX - objParams.pagex);
						var elementTd = element.find('tbody').find('td').eq($(objParams.element).index());
						if (width < 40) {
							width = 40;
						}
						elementTd.width(width);
					};
					
					var tableMouseUp = function tableMouseUp(e) {
						e.stopPropagation();
						this.removeEventListener('mousemove', tableMouseMove, false);
					};
					
					var tableMouseDown = function tableMouseDown(e) {
						objParams.element = this.parentElement;
						objParams.width = this.parentElement.offsetWidth || 0;
						objParams.pagex = e.pageX || 0;
						document.body.addEventListener('mousemove', tableMouseMove, false);
						document.body.addEventListener('mouseup', tableMouseUp, false);
					};
					
					var bindEvent = function bindEvent() {
						thAttr.find('.table-dragel').on('mousedown', tableMouseDown);
					};
					
					var appendDragEl = function appendDragEl() {
						var dragDom = '<span class="table-dragel"></span>';
						thAttr = element.find('.ng-table-sort-header').find('th');
						if (thAttr.length) {
							attrs.notIndex += ',' + thAttr.length;
							thAttr.not(function (index) {
								index += 1;
								return attrs.notIndex.indexOf(index.toString()) !== -1 ? index : '';
							}).append(dragDom);
							bindEvent();
						}
					};
					
					
					var init = function init() {
						element.addClass('table-drag');
						appendDragEl();
					};
					
					scope.$evalAsync(function () {
						setTimeout(function () {
							init();
						}, 2000);
					});
					
				}
			};
		}]);
})(angular);

(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswLookup', ['$timeout', function ($timeout) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				items: '=',
				afterSelect: '&',
				dir: '@',
				filter: '&'
			},
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-lookup.html',
			controller: ['$scope', function (scope) {
				
				var self = this, filters = [];
				self.isFiltered = false;
				
				self.isOpen = scope.isOpen;
				
				scope.execOutterFitler = function execOutterFitler(items) {
					items = items || scope.currentItems;
					
					_.forEach(filters, function (filter) {
						items = _.filter(items, filter);
					});
					return items;
				};
				
				scope.registerFitler = function (filter) {
					filters.push(filter);
				};
				
				
				scope.select = function select(item) {
					if (item.id === -9999) {
						return;
					}
					var value = _.get(scope.getSource(item), scope.value);
					if (angular.isDefined(value)) {
						scope.viewValue(value);
						scope.setSelected(item);
					}
					
					scope.afterSelect({value: value, item: scope.getSource(item)});
				};
				
				scope.execFilter = function execFilter(items) {
					items = items || scope.currentItems;
					
					items = scope.execOutterFitler(items);
					scope.displayItems = _.filter(items, function (item) {
						item = scope.getSource(item);
						var text = _.get(item, scope.display);
						return !scope.displayText || text.indexOf(scope.displayText) >= 0;
					});
					self.isFiltered = true;
				};
				
				scope.filterSelect = function filterSelect() {
					scope.execFilter();
					scope.showSelectWidge(true);
				};
				
				scope.getFocusedStyle = function getFocusedStyle(item) {
					return scope.focusedItem === scope.getSource(item) && 'focused';
				};
				
				self.focusIndex = function (index) {
					if (!_.isUndefined(index)) {
						if (index < 0) {
							index = 0;
						} else if (index >= scope.displayItems.length) {
							index = scope.displayItems.length - 1;
						}
						
						scope.focusedItem = scope.getSource(scope.displayItems[index]);
					} else if (scope.focusedItem) {
						index = _.findIndex(scope.displayItems, scope.focusedItem);
					} else {
						index = 0;
					}
					return index;
				};
				
				scope.focusNextListItem = function focusNextListItem() {
					var index = self.focusIndex();
					self.focusIndex(index + 1);
				};
				
				scope.focusPreviousListItem = function focusPreviousListItem() {
					var index = self.focusIndex();
					self.focusIndex(index - 1);
				};
				
				self.formatDisplayItems = function (items, initItems) {
					if (_.isFunction(self.listFormatter)) {
						items = self.listFormatter(items);
					}
					scope.currentItems = items;
					if (initItems && initItems.length && self.isFiltered) {
						scope.execFilter(items);
					} else {
						items = scope.execOutterFitler(items);
						scope.displayItems = items;
					}
					
					scope.displayItems = scope.displayItems || [];
					
					if (!scope.displayItems.length) {
						scope.displayItems.push({name: '【无】', id: -9999});
					}
					var filter = {};
					filter[scope.value] = scope.viewValue();
					var sourceItems = _.map(items, scope.getSource);
					scope.setSelected(_.find(sourceItems, filter));
				};
				
				/**
				 * 用于lookupTree 取得其源数据
				 * @param item
				 * @returns {*}
				 */
				scope.getSource = function (item) {
					return item;
				};
				
				self.override = function (method, handler) {
					scope[method] = handler;
				};
				
				self.getScope = function () {
					return scope;
				};
				
				scope.$watchCollection('items', self.formatDisplayItems);
				
				self.listFormatter = angular.noop();
				
				self.execFilter = scope.execFilter;
				self.select = scope.select;
				self.registerFitler = scope.registerFitler;
			}],
			link: function (scope, element, attrs, ctrl) {
				scope.size = attrs.size || 'size-md';
				scope.display = attrs.nswDisplay || 'name';
				scope.value = attrs.nswValue || '_id';
				scope.isOpen = function isOpen() {
					return element.find('ul.nsw-dropdown-menu.dropdown-menu').css('display') !== 'none';
				};
				
				scope.viewValue = function (value) {
					if (angular.isDefined(value)) {
						ctrl.$setViewValue(value);
					} else {
						return ctrl.$viewValue;
					}
				};
				scope.setSelected = function setSelected(item) {
					item = item || {};
					scope.selected = item;
					if (item.id === -9999) {
						scope.displayText = item.name;
					} else {
						item = scope.getSource(item);
						scope.displayText = _.get(item, scope.display);
						scope.focusedItem = item;
					}
				};
				if (attrs.filter) {
					scope.registerFitler(function (item, index) {
						return scope.filter({item: item, index: index});
					});
				}
				
				ctrl.$render = function render() {
					var value = ctrl.$viewValue;
					var filter = {};
					if (value) {
						_.set(filter, scope.value, _.isObject(value) ? value[scope.value] : value);
						var item = scope.getSource(_.find(scope.currentItems, filter));
						
						if (item && item.id === -9999) {
							scope.displayText = item.name;
						} else {
							scope.selected = item;
							scope.displayText = _.get(item, scope.display);
						}
					}
					
				};
				
				scope.render = function () {
					ctrl.$render();
				};
				
				scope.clearValue = function ($event) {
					scope.setSelected(null);
					ctrl.$setViewValue(null);
					scope.displayText = '';
					scope.focusedItem = null;
					scope.execFilter();
					if ($event) {
						$event.stopPropagation();
					}
				};
				
				element.find('input,.nsw-dropdown').on('click', function (e) {
					scope.showSelectWidge(!isOpened);
					e.stopPropagation();
				});
				
				element.on('keydown', function (e) {
					if (!scope.isOpen()) {
						scope.showSelectWidge(true);
						return;
					}
					switch (e.which) {
						case 40:
							scope.focusNextListItem();
							e.stopPropagation();
							break;
						case 38:
							scope.focusPreviousListItem();
							e.stopPropagation();
							break;
						case 13:
							scope.select(scope.focusedItem);
							scope.showSelectWidge();
							e.stopPropagation();
					}
					
					scope.$apply();
					
				});
				
				$('body').on('click', function () {
					if ($('.dropdown.open').length) {
						setTimeout(function () {
							scope.$apply();
						}, 500);
					}
				});
				
				var isOpened = false;
				scope.showSelectWidge = function showSelectWidge(showSelect, showAll) {
					if (scope.dir === 'up') {
						element.find('.dropmenu').css('position', 'inherit');
					}
					
					if ((showSelect && !isOpened) || (_.isUndefined(showSelect) && !isOpened)) {
						element.find('.nsw-dropdown-menu').dropdown('toggle');
					}
					
					if (showAll) {
						scope.displayItems = scope.execFilter(scope.currentItems);
					}
				};
				
				scope.$evalAsync(function () {
					element.find('.dropmenu').on('shown.bs.dropdown', function () {
						$timeout(function () {
							isOpened = true;
						});
					});
					
					element.find('.dropmenu').on('hidden.bs.dropdown', function () {
						$timeout(function () {
							isOpened = false;
						});
					});
				});
				
				scope.$watch(function () {
					return scope.isOpen();
				}, function (isOpen) {
					if (!isOpen) {
						scope.setSelected(scope.selected);
					}
				});
			}
		};
	}]);
}(angular));
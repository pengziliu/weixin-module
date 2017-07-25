(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswLookupTree', [function () {
		return {
			restrict: 'AE',
			require: 'nswLookup',
			//templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-lookup.html',
			link: function (scope, element, attrs, nswLookup) {
				scope.display = attrs.nswDisplay || 'name';
				scope.value = attrs.nswValue || '_id';
				scope.nswChildren = attrs.nswChildren || 'children';
				
				var spaces = '　　　　　　　　　　　　　　　　　　';
				nswLookup.listFormatter = function mapTree(tree, result, leval, parent) {
					tree = _.isArray(tree) ? tree : [tree || {}];
					leval = leval || 0;
					result = result || [];
					_.forEach(tree, function (node) {
						var copy = {};
						copy[scope.value] = node[scope.value];
						copy[scope.display] = node[scope.display];
						copy.spaces = new Array(leval);
						copy._source = node;
						copy.parent = parent;
						result.push(copy);
						if (node[scope.nswChildren]) {
							copy[scope.display] = copy[scope.display] ? (spaces.slice(0, leval) + '└ ' + copy[scope.display]) : '';
							mapTree(node[scope.nswChildren], result, leval + 1, copy);
						} else {
							copy[scope.display] = copy[scope.display] ? (spaces.slice(0, leval) + '├ ' + copy[scope.display]) : '';
						}
					});
					
					return result;
				};
				
				nswLookup.override('getSource', function (item) {
					return (item || {})._source || item;
				});
				
				var getParent = function (item, items) {
					items = items || [];
					if (item.parent) {
						items.push(item.parent._source);
						getParent(item.parent, items);
					}
				};
				
				nswLookup.override('execFilter', function (items) {
					var parentScope = nswLookup.getScope(),
						parentItems = [];
					
					items = items || parentScope.currentItems;
					
					items = parentScope.execOutterFitler(items);
					var matchedItems = _.filter(items, function (item) {
						var srcItem = parentScope.getSource(item);
						var text = _.get(srcItem, scope.display);
						var matched = !parentScope.displayText || text.indexOf(parentScope.displayText) >= 0;
						if (matched) {
							getParent(item, parentItems);
						}
						return matched;
					});
					
					parentScope.displayItems = _.filter(items, function (item) {
						var filter = {};
						filter[scope.value] = item[scope.value];
						return _.find(parentItems, filter) || _.find(matchedItems, filter);
					});
					
					nswLookup.isFiltered = true;
				});
				
			}
		};
	}]);
}(angular));
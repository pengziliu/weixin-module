(function (angular) {
	"use strict";

	angular.module('platform').directive('nswTplSelector', [ function () {
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope:{
				tempList:'=',
				type:'@',
				selected:'&',
				formName: '='
			},
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-tpl-selector.html',
			link: function (scope,element,attrs,ctrl) {
				scope.options = {};
				scope.selectedItems = {};
				var currentItem,templist;

				//列表模板选中。
				scope.selectPageTpl = function (row) {
					_.map(scope.selectedItems, function(item, key, input) {
						input[key] = false;
					});
					scope.selectedItems[row._id] = true;
					if(row&&row._id){
						if(!_.find(templist,{type:row.type})){
							currentItem = {id:row._id,type:row.type};
							templist.push(currentItem);
						}else{
							currentItem.id = row._id;
						}
					}
					ctrl.$setViewValue(templist);
                    scope.formName.$setDirty();
					scope.selected();
					//LoadAdInfo();
				};

                /**
				 * 用于处理当前详情绑定的模板选中（不满足默认选第一个）
				 * --1、没有绑定模板（为空）
				 * --2、更换套餐后导致绑定的还是之前的模板（绑定的模板不存在于数据列表中）
                 * @param currentItemId - 详情数据里对应的模板id（可选）
                 */
                var hasSelected = function hasSelected(currentItemId) {
                    if (!scope.options.tempList) {
                        return;
                    }
                    if (_.find(scope.options.tempList, {_id: currentItemId})) {
                        scope.selectedItems[currentItemId] = true;
                    } else {
                        scope.selectPageTpl(scope.options.tempList[0]);
                        scope.formName.$setDirty();
                    }
                };

				ctrl.$render = function(){
					templist = ctrl.$viewValue||[];
					_.map(scope.selectedItems, function(item, key, input) {
						input[key] = false;
					});
					if(templist&&templist.length>2){
						templist = [];
					}
					if(templist&&templist.length){
						_.forEach(templist,function(value,key){
							if(value.type === scope.type){
								currentItem = templist[key];
							}
						});
						//currentItem = _.filter(ctrl.$viewValue,{type:scope.type})[0];
						if(currentItem&&currentItem.id){
                            hasSelected(currentItem.id);
						} else {
                            hasSelected();
						}
					} else {
                        hasSelected();
					}
				};

				var watcher = scope.$watch('tempList',function (newValue){
					scope.options.tempList = newValue||[];
					//默认第一个为选中
					if(_.isArray(newValue)&&ctrl.$viewValue){
						ctrl.$render();
					}

				});
				scope.$on('$destroy',function(){
					watcher();
				});
			}
		};
	}]);
}(angular));
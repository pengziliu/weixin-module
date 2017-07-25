(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswTabset', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			scope: {
				onSelect: '&select', /*select被执行完成后*/
				onInit: '&', /*初始化后返回当前的TABSET对象*/
				perLoad: '@', /*是否预加载所有页面 true | false*/
				options: '=',
				async : '='
			},
			transclude: true,
			templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-tabset-dir.html',
			link: function (scope, element, attr, ctrl, transcludeFn) {
				var SCROLL_RATE = 0.9; //滚动速率，0-1 越大速度越快.
				scope.isOverflow = false;
				
				var totalTabWidthWatcher = null,
					asyncSetting = {load : false, watcher : null, isAsync:angular.isDefined( attr.async)};
				
				var getTotalTabWidth = function () {
					return _.sum(_.map($('ul.nav>li', element), function (li) {
						return $(li).width();
					}));
				};
				
				var handleOverFlow = function(newVal){
					var headerWidth = $('ul.nav', element).width();
					scope.isOverflow = headerWidth < newVal;
					if (!scope.isOverflow) {
						scope.goFirst();
						$('.tab-nav-container', element).width($('.tab-nav-header', element).width());
					} else {
						$('.tab-nav-container', element).width($('.tab-nav-header', element).width() - 100);
					}
				};
				
				totalTabWidthWatcher = scope.$watch(function () {
					return getTotalTabWidth();
				}, function (newVal) {
					handleOverFlow(newVal);
					if(asyncSetting.isAsync && asyncSetting.load){
						handleOverFlow(newVal);
					}
				});
				
				if( asyncSetting.isAsync ) {
					asyncSetting.watcher = scope.$watch('async', function (value) {
						if(value) {
							asyncSetting.load = true;
							handleOverFlow( getTotalTabWidth() );
						}
					});
				}
				
				scope.goLast = function goLast() {
					$timeout(function () { //UI更新需要时间，做一个延迟可以解决问题
						var totalWidth = getTotalTabWidth();
						$('.tab-nav-container').scrollLeft(totalWidth);
						scope.isLast = true;
						scope.isFirst = false;
					});
				};
				
				scope.goFirst = function goLast() {
					$('.tab-nav-container').scrollLeft(0);
					scope.isFirst = true;
					scope.isLast = false;
				};
				
				scope.goNext = function () {
					var pageWidth = $('ul.nav').width();
					var totalWidth = getTotalTabWidth();
					var scroll = $('.tab-nav-container').scrollLeft();
					var newScroll = scroll + pageWidth * SCROLL_RATE;
					if (newScroll < totalWidth) {
						$('.tab-nav-container').animate({
							scrollLeft: newScroll
						}, 'slow');
						scope.isFirst = false;
					} else {
						scope.goLast();
					}
				};
				
				scope.goPrev = function () {
					var pageWidth = $('ul.nav').width();
					var scroll = $('.tab-nav-container').scrollLeft();
					var newScroll = scroll - pageWidth * SCROLL_RATE;
					if (newScroll > 0) {
						$('.tab-nav-container').animate({
							scrollLeft: newScroll
						}, 'slow');
						scope.isLast = false;
					} else {
						scope.goFirst();
					}
				};
				
				//防止界面跳动，先藏起来
				$('[tab-footer],[data-tab-footer]', element).hide();
				
				scope.$evalAsync(function () {
					transcludeFn(scope.$parent, function (clone) {
						var header = $('[tab-header],[data-tab-header]', clone);
						var body = $('[tab-body],[data-tab-body]', clone);
						var footer = $('[tab-footer],[data-tab-footer]', clone);
						if (!header.length && !footer.length && !body.length) {
							body = element.children();
						}
						var content = $('<div class="nsw-tab-views-header"></div><div class="nsw-tab-views"></div><div class="nsw-tab-views-footer"></div>');
						
						$('.nsw-tab-views-header', content).append(header);
						$('.nsw-tab-views', content).append(body);
						$('.nsw-tab-views-footer', content).append(footer);
						setTimeout(function () {
							$('[tab-footer],[data-tab-footer]', element).show();
						}, 500);
						element.append(content);
					});
					
					//固定HEADER UL的宽度
					$('.tab-nav-container', element).width($('.tab-nav-header', element).width());
				});
				
				scope.$on('$destroy', function(){
					if( asyncSetting.isAsync ){
						asyncSetting.watcher();
					}
					totalTabWidthWatcher();
				});
			},
			controller: ['$scope', 'platformModalSvc', function ($scope, platformModalSvc) {
				$scope.tabs = [];
				var self = this;
				self.getTabInfo = function (name) {
					$scope.options = $scope.options || {};
					return $scope.options[name] || {};
				};
				
				self.count = function () {
					return $scope.tabs.length;
				};
				
				self.addTab = function addTab(tab) {
					tab.name = tab.name || 'tab_' + $scope.tabs.length;
					
					if(_.find($scope.tabs,{name:tab.name})){ //如果已经存在风名的TAB则不添加，ngIf操作可能会添加多个相同的TAB
						return;
					}
					
					tab.isShow = true;
					$scope.tabs.push(tab);
					
					$scope.tabs = _.sortBy($scope.tabs, 'order');
					if ($scope.tabs.length === 1) {
						self.selectTab(tab);
					}
					if ($scope.goLast) {
						$scope.goLast();
					}
					return tab;
				};
				
				/*var doRemoveTab = function doRemoveTab(tab) {
					var index = _.findIndex($scope.tabs, tab);
					_.remove($scope.tabs, tab);
					$scope.$root.$broadcast('tabRemoved', tab);
					if (tab.active) {
						if ($scope.tabs[index]) {
							self.selectTab($scope.tabs[index]);
						} else {
							self.selectTab($scope.tabs[index - 1]);
						}
					}
					
				};*/
				
				self.removeDestoriedTab = function removeDestoriedTab(tab) {//单纯地把tab移除掉
					var index = _.findIndex($scope.tabs, tab);
					if(index===-1){ //在destory的时候也会调这个访求，所以有可能会调用两次
						return;
					}
					_.remove($scope.tabs, tab);
					if (tab.active) {
						if ($scope.tabs[index]) {
							self.selectTab($scope.tabs[index]);
						} else {
							self.selectTab($scope.tabs[index - 1]);
						}
					}
				};
				
				
				$scope.removeTab = self.removeTab = function removeTab(tab, noConfirm) {
					if (noConfirm) {
						//这个事件会触发外部提示
						$scope.$root.$broadcast('tabRemoved', tab);
						self.removeDestoriedTab(tab);
					} else {
						platformModalSvc.showConfirmMessage('确认删除？', '提示').then(function () {
							$scope.$root.$broadcast('tabRemoved', tab);
							self.removeDestoriedTab(tab);
						});
					}
				};
				
				
				
				self.getParent = function getParent() {
					return $scope.$parent;
				};
				
				self.selectTab = $scope.selectTab = function (selected) {
					_.forEach($scope.tabs, function (tab) {
						tab.active = tab === selected;
					});
					
					$scope.onSelect({tab: selected});
					$scope.$root.$broadcast('tabSelected', selected);
				};
				
				self.isPerLoad = function isPerLoad() {
					return $scope.perLoad === 'true';
				};
				
				$scope.tabStateClass = function isActive(tab) {
					if (tab.active) {
						return 'active';
					} else if (tab.disabled) {
						return 'disabled';
					}
				};
				
				$scope.onInit({tabset: self});
			}]
		};
	}]);
}(angular));
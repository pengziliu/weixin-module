(function (angular) {
	"use strict";
	
	angular.module('platform').directive('nswTab', ['$compile', '$http', '$controller', 'nswTabCacheSvc',
		function ($compile, $http, $controller, nswTabCacheSvc) {
			return {
				restrict: 'A',
				transclude: true,
				scope: {
					templateController: '@nswController', /*controller*/
					templateUrl: '@templateUrl', /*template url, 当没有时直接读取内部的HTML内容，否则会替换到内部的HTML内容*/
					title: '@', /*TAB标题*/
					active: '=',
					order: '@',
					enableRemove: '@',
					required: '@nswRequired', /*是否为必填，必填时有个红星号*/
					nswTab: '@',
					onSelect: '&select', /*select被执行完成后*/
					onRemove: '&remove'
				},
				require: '^?nswTabset',
				template: '<div class="nsw-tab"  ng-show="tab.active" ng-transclude=""></div>',
				link: function (scope, element, attrs, tabset) {
					scope.tab = {
						ifShow: true
					};
					/**
					 * 初始化 Tab设置信息
					 */
					var initTabInfo = function () {
						scope.templateUrl = scope.templateUrl || tabset.getTabInfo(scope.nswTab).templateUrl;
						scope.active = scope.active || tabset.getTabInfo(scope.nswTab).active;
						scope.templateController = scope.templateController || tabset.getTabInfo(scope.nswTab).controller;
					};
					
					var loadViewTemplate;
					if (!tabset) {
						return;
					}
					
					var templateScope = tabset.getParent(),
						ctrlLocals = {},
						isTemplateLoaded = false,
						ngShowWatcher = angular.noop,
						ngHideWatcher = angular.noop,
						ngIfWatcher = angular.noop;
					
					
					var initView = function initView() {
						scope.tab = {
							title: scope.title || tabset.getTabInfo(scope.nswTab).title,
							defaultTitle: scope.title || tabset.getTabInfo(scope.nswTab).title,
							required: scope.required === 'true',
							order: Number(scope.order) || tabset.count(),
							name: scope.nswTab,
							active: false,
							isShow: true,
							ifShow: true,
							enableRemove: scope.enableRemove === 'true'
						};
						tabset.addTab(scope.tab);
						
						if (tabset.isPerLoad()) {
							loadViewTemplate();
						}
					};
					
					loadViewTemplate = function loadViewTemplate() {
						initTabInfo();
						if (isTemplateLoaded || !scope.templateUrl) {
							return;
						}
						isTemplateLoaded = true;
						templateScope = templateScope.$new();
						if (scope.templateController) {
							ctrlLocals.$scope = templateScope;
							ctrlLocals.$tab = scope.tab;
							$controller(scope.templateController, ctrlLocals);
						}
						
						nswTabCacheSvc.loadTemplate(scope.templateUrl).then(function (template) {
							template = '<div>' + template + '</div>';
							var $template = $(template);
							$compile($template)(templateScope);
							$('.nsw-tab', element).children().remove();
							$('.nsw-tab', element).append($template);
						});
					};
					
					
					scope.$on('tabSelected', function (e, tab) {
						if (tab === scope.tab) {
							loadViewTemplate();
							scope.onSelect({tab: tab});
						}
					});
					
					scope.$on('tabRemoved', function (e, tab) {
						if (tab === scope.tab) {
							scope.onRemove({tab: tab});
							$('.nsw-tab', element).children().remove();
						}
					});
					
					scope.getTabInfo = tabset.getTabInfo;
					
					initView();
					
					attrs.$observe('title', function () {
						if (!tabset.getTabInfo(scope.nswTab).title && scope.title) {
							scope.tab.title = scope.title;
						}
					});
					attrs.$observe('required', function () {
						scope.tab.required = scope.required === 'true';
					});
					
					/**
					 * 监听TAB设置信息
					 */
					var titleWatcher = scope.$watch(function () {
						return tabset.getTabInfo(scope.nswTab).title;
					}, function (val) {
						if (val) {
							scope.tab.title = scope.title = val;
						}
					});
					
					if (attrs.ngIf) {
						ngIfWatcher = tabset.getParent().$watch(attrs.ngIf, function ngShowWatchAction(value) {
							scope.tab.ifShow = value;
							if (!value) {
								tabset.removeTab(scope.tab, true);
								$('.nsw-tab', element).children().remove();
								if (scope.templateController) {
									templateScope.$destroy();
								}
							} else {
								loadViewTemplate();
							}
						});
					}
					
					if (attrs.ngShow) {
						ngShowWatcher = tabset.getParent().$watch(attrs.ngShow, function ngShowWatchAction(value) {
							scope.tab.isShow = value;
						});
					}
					if (attrs.ngHide) {
						ngHideWatcher = tabset.getParent().$watch(attrs.ngHide, function ngShowWatchAction(value) {
							scope.tab.isShow = !value;
						});
					}
					
					
					scope.$watch('active', function (val) {
						if (val) {
							tabset.selectTab(scope.tab);
						}
					});
					
					scope.$on('$destroy', function () {
						ngShowWatcher();
						ngHideWatcher();
						ngIfWatcher();
						titleWatcher();
						tabset.removeDestoriedTab(scope.tab);//要把它向移掉，否则会导致新增分站时有重复的标签
						
						$('.nsw-tab', element).children().remove();
						if (scope.templateController) {
							templateScope.$destroy();
						}
					});
				}
			};
		}]);
}(angular));
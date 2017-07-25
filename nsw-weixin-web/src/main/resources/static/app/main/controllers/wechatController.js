/*global angular*/
(function (angular) {
	"use strict";
	angular.module("app").controller("wechatCtrl", ['$scope', '$state','$location','$sessionStorage', 'mainMenuSvc', 'platformNavigationSvc', 'platformMenuDataSvc', 'nswGlobals', 'basListCtrlSvc', 'accountDataSvc', 'platformNswAuthSvc','switchProjectSvc',
		function ($scope, $state,$location, $sessionStorage,mainMenuSvc, platformNavigationSvc, platformMenuDataSvc, nswGlobals, basListCtrlSvc, accountDataSvc, platformNswAuthSvc,switchProjectSvc) {
			basListCtrlSvc.createInstance($scope, mainMenuSvc);

			$scope.isWelcome = true;
			$scope.leftEdit = false;
			$scope.showMenus = true;
			$scope.enableSwitchProject = true;
			var getCurrentWechatInfo = function getCurrentWechatInfo(currentItem) {
				$scope.currentWechtInfo = currentItem;
			};
			$scope.goMaterials = function goMaterials() {
				$state.go('wechat.materialsAdd');
			};
			var menuLoaded = function menuLoaded(menus){
				if (menus && menus.groups.length) {
					$scope.menuOptions = menus;
					mainMenuSvc.setMenus(menus);
					$scope.breadNavs = mainMenuSvc.buildNavigation(platformMenuDataSvc.getCurrentMenu(), platformMenuDataSvc.getCurrentMenuGroup());
				}
			};
			platformMenuDataSvc.registerMenuLoaded(menuLoaded);

			platformNavigationSvc.registerRouteUpdated(function (menu) {
				$scope.isWelcome = menu.key === 'welcome';
			});
			var processData = function processData(data) {
				var projectType, language, websiteType;
				if (data.length) {
					_.forEach(data, function (enterprise) {
						_.forEach(enterprise.portfolios, function (projectGroup) {
							projectGroup.info = '';
							if (projectGroup.projects.length > 1) {
								projectGroup.info += 'pc+手机';
							} else {
								websiteType = projectGroup.projects[0].websiteType;
								switch (websiteType) {
									case '4':
									case '9':
										projectGroup.info += 'pc';
										break;
									case '5':
									case '10':
										projectGroup.info += '手机';
										break;
									//case '7': projectGroup.info+='微信管家';break;
								}
							}
							projectType = projectGroup.projects[0].projectType;
							language = projectGroup.projects[0].language;

							switch (projectType) {
								case 'KXWEBSITE':
									projectGroup.info += '快效网站';
									break;
								case 'WXGJ':
									projectGroup.info += '微信管家';
									break;
								case 'STANDARDWEBSITE':
									projectGroup.info += '标准网站';
									break;
							}
						});
					});

				}
				return data;
			};
			switchProjectSvc.getProjects().then(function (items) {
				if(!items){
					return;
				}
				$scope.enterprises = processData(items) || [];
				var projects = [];
				_.map(items, function (enterprise) {
					var items = _.map(enterprise.portfolios, function (port) {
						_.each(port.projects, function (project) {
							projects.push(project);
						});
					});
					return items;
				});
				$scope.projects = projects;
				var selectedProject = $location.$$search.projId? {id: $location.$$search.projId} : $sessionStorage.selectedProject;
				if (selectedProject&&selectedProject.id) {
					mainMenuSvc.setLoginProject(selectedProject);
				} else {
					$scope.switchProject();
				}
			});
			$scope.goToWechat = function goToWechat(project) {
				$sessionStorage.selectedProject = project;
				mainMenuSvc.setLoginProject(project);
				$state.go('wechat.account');
				$scope.showMenu();


			};
			$scope.exit = function exit(route) {
				nswGlobals.setValue('accountId', null, true);
				nswGlobals.setValue('appId', null, true);
				nswGlobals.setValue('platform_menus_selectedMenu', null, true);
				nswGlobals.setValue('platform_menus_selectedMenuGroup', null, true);
				$sessionStorage.selectedProject ={};
				$location.$$search.projId = null;
				$scope.$broadcast('app.exit');
				window.location = route;
			};


			$scope.$on('$stateChangeStart', function (e, toState) {
				$scope.isWelcome = toState.name === 'wechat.account' || toState.name === 'wechat.authorizeMain.explain' || toState.name === 'wechat.authorizeMain.mode' || toState.name === 'wechat.authorizeMain.success' || toState.name === 'wechat.authorizeUrl' || toState.name === 'wechat.authorizeAbout';
				$scope.leftEdit = !(toState.name === 'wechat.accountAdd' || toState.name === 'wechat.accountEdit');
			});

			$scope.$on('$stateChangeSuccess', function (e, route) {
				platformMenuDataSvc.selectMenu(route.name, false);
			});

			$scope.editAccount = function editAccount() {
				platformMenuDataSvc.selectMenu('公众号管理');
				$scope.leftEdit = true;
			};

			$scope.hideMenu = function hideMenu() {
				$scope.showMenus = false;
			};

			$scope.showMenu = function showMenu() {
				$scope.showMenus = true;
			};

			$scope.switchProject = function switchProject() {
				$scope.goState('switchProject');
			};

			$scope.checkAuthed = function checkAuthed(code) {
				return platformNswAuthSvc.getAuth(code);
			};

			var menuSelected = function menuSelected(menu, group) {
				accountDataSvc.setEidtHistory(menu.name);
				$scope.breadNavs = mainMenuSvc.buildNavigation(menu, group);
				$scope.currentGroup = group;
			};
			accountDataSvc.registerCurrentItemChanged(function (currentItem) {
				getCurrentWechatInfo(currentItem);
			});
			platformMenuDataSvc.registerMenuSelected(menuSelected);

			$scope.$on('$destroy', function () {
				platformNavigationSvc.unregisterMenuSelected(menuSelected);
				accountDataSvc.unregisterCurrentItemChanged();
			});


		}]);
}(angular));

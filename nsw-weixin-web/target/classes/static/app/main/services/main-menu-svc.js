/**
 * Created by yaoyc on 2016/5/9.
 */

/*global angular*/
(function (angular) {
	"use strict";
	/**
	 * accountDataSvc 注入不能删除，因为它会默认初始化微信APP数据加载
	 */
	angular.module('app').factory('mainMenuSvc', ['$http','$sessionStorage','platformMenuDataSvc', 'basDataSvc', 'accountDataSvc','$location',
		function ($http,$sessionStorage,platformMenuDataSvc, basDataSvc, accountDataSvc,$location) {
		var selectedProject, options = {
			requireAppId: false,
			list: {
				enableSearch: true,
				listUri: 'user/loginUser',
				selectionMode: 'single'
			}
		};

		var service = basDataSvc.createInstance(options);
		service.setLoginProject = function setLoginProject(project) {
			$sessionStorage.selectedProject = selectedProject = project;
			$http.defaults.headers.common.projectId = service.getProjectId();
			//platformNavigationSvc.reloadMenus();
		};
		service.setProjectId = function setProjectId(projectId) {
			$http.defaults.headers.common.projectId = projectId;
		};
		var projId = $location.$$search.projId || ($sessionStorage.selectedProject || {}).id;
		if (projId) {
			service.setProjectId(projId);
		}
		var _menus = {groups: []};

		service.setMenus = function setMenus(menus) {
			_menus = menus;
		};
		service.buildNavigation = function buildNavigation(menu, group) {
			var arr = [];
			var menuDefault = _menus.groups[0];

			if (!menuDefault) {
				return;
			}

			if (menuDefault.state !== menu.state) {
				//if (menu !== group && !menu.isDefault) {
				if (menu !== group) {
						arr.push(menuDefault);
						arr.push(group);
						arr.push(menu);
				}else{
					arr.push(menuDefault);
					arr.push(group);
				}
			} else {
				arr.push(menuDefault);
			}
			return arr;
		};
		service.loadData();
		platformMenuDataSvc.registerMenuLoaded(function (data) {
			service.setMenus(data);
		});
		service.getProject = function getProject() {
			return selectedProject || {};
		};

		service.getProjectId = function getProjectId() {
			var loginInProject = service.getProject();
			return loginInProject.id;
		};


		return service;
	}]);

}(angular));

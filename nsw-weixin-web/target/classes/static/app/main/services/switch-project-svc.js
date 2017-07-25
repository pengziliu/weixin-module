(function (angular) {
	"use strict";

	angular.module('app').factory('switchProjectSvc', ['$http','$q', function ($http,$q) {
		var service = {}, projectSelected = false;
		var muiltEnterprise = { // 一个用户有多个企业，处理从超级后台做单
			isMuilt: false,
			message: ''
		};
		service.isMuiltEnterprise = function () {
			return muiltEnterprise.isMuilt;
		};
		service.getMuiltEnterprise = function () {
			return muiltEnterprise;
		};
		service.getProjects = function getProjects() {
			var url = globals.basAppRoot + 'cms/getProjects';
			return $http.get(url).then(function (res) {
				if (res.data.isSuccess) {
					return res.data.data;
				}
				return [];
			}, function (error) {
				console.error(error);
			});
		};
		//service.switchProject = function switchProject(switchTo) {
		//	if (_.isObject(switchTo)) {
		//		desktopMainSvc.setLoginProject(switchTo);
		//		$state.go('cms.personalInfo');
		//	}
		//};
		return service;
	}]);

}(angular));
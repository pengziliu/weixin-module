(function (angular) {
	"use strict";
	
	angular.module('coursereg').factory('courseRegDataSvc', ['basDataSvc', '$http', 'nswGlobals', function (basDataSvc, $http, nswGlobals) {
		
		var options = {
			name: 'courseRegSvc',
			uri: 'activeMember',
			requireAppId: true,
			item: {
				default: {},
				loadUri:'getActiveMember'
			},
			list: {
				listUri: 'activeMember/list',
				listMethod: 'get',
				enablePaging: true,
				enableSearch: true,
				selectionMode: 'single',
				pageSize: 20
			}
		};
		var service = basDataSvc.createInstance(options);
		
		
		service.searchCourseHistory = function searchCourseHistory(searchOptions) {
			return $http(
				{
					method: 'get',
					url: globals.basAppRoot + 'activeMember/activeHistory',
					params: searchOptions
				}
			).then(function (res) {
				return res.data.data;
			});
		};
		
		return service;
	}]);
}(angular));
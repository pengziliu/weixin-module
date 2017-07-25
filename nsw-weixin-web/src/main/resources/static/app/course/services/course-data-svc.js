(function(angular) {
	"use strict";

	angular.module('course').factory('courseDataSvc', ['$http', 'basDataSvc', 'nswGlobals', 'platformDateSvc', function($http, basDataSvc, nswGlobals, platformDateSvc) {

		var options = {
			name: 'activeSvc',
			uri: 'active',
			requireAppId: true,
			item: {
				default: {
					originalPrice: 0.00,
					price: 0.00
				},
				afterCreated: function(item) {
					item.appId = nswGlobals.getValue('appId');
					item.activeStartTime = platformDateSvc.formateDate(new Date(), 'YYYY-MM-DD hh:mm');

					var finishTime = new Date();
					finishTime.setHours(finishTime.getHours() + 1);
					item.finishTime = platformDateSvc.formateDate(finishTime, 'YYYY-MM-DD hh:mm');
				}
			},
			list: {
				listUri: '/active/list',
				listMethod: 'get',
				enablePaging: true,
				enableSearch: true,
				selectionMode: 'single',
				pageSize: 10
			}
		};
		var service = basDataSvc.createInstance(options);


		service.searchCourseRegHistory = function searchCourseRegHistory(searchOptions) {
			return $http({
				method: 'get',
				url: globals.basAppRoot + '/activeMember/course/list',
				params: searchOptions
			}).then(function(res) {
				return res.data.data;
			});
		};

		return service;
	}]);
}(angular));
/**
 * Created by yaoyc on 2017/5/2.
 */
(function (angular) {
	"use strict";
	angular.module('log').factory('logSvc', ['basDataSvc', 'platformModalSvc',
		function (basDataSvc,platformModalSvc) {
			var options = {
				requireAppId:true,
				uri:'',
				item:{
					default:{}
				},
				list:{
					method:'get',
					listUri:'log/list',
					enablePaging:true,
					pageSize:10,
					enableSearch:true,
					selectionMode: 'single'
				}
			};

			var service = basDataSvc.createInstance(options);
			return service;
		}]);
})(angular);
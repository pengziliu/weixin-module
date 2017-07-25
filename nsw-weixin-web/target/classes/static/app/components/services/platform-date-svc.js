(function (angular) {
	"use strict";
	angular.module('platform').factory('platformDateSvc', [function () {
		var service = {};
		
		service.dateRange = function dateRange(options) {
			var deOption = {
				start: new Date().valueOf(),
				range: 7
			};
			var opt = $.extend({}, deOption, options);
			return new Date(opt.start - opt.range * 86400000).format('yyyy-MM-dd');
		};
		
		/**
		 * 字符串转时间（yyyy-MM-dd HH:mm:ss）
		 * result （分钟）
		 */
		service.stringToDate = function (fDate) {
			var dateString = fDate.split(' ')[0];
			var timeString = fDate.split(' ')[1];
			
			var year = dateString.split('-')[0];
			var month = dateString.split('-')[1];
			var day = dateString.split('-')[2];
			
			var hour = timeString.split(':')[0];
			var minute = timeString.split(':')[1];
			var second = timeString.split(':')[2];
			
			var iYear = Number(year) || 2017;
			var iMonth = Number(month) || 1;
			var iDay = Number(day) || 1;
			
			var iHour = Number(hour) || 0;
			var iMinute = Number(minute) || 0;
			var iSecond = Number(second) || 0;
			
			return new Date(iYear, iMonth - 1, iDay, iHour, iMinute, iSecond);
		};
		
		/**
		 * 日期转换成字符串
		 * formatDate(cDate, "yyyy-MM-dd");
		 * @param date 日期
		 * @param formate 格式
		 * @returns {string}
		 */
		service.formateDate = function formateDate(date, format) {
			return moment(date).format(format);
		};
		
		return service;
	}]);
	
}(angular));
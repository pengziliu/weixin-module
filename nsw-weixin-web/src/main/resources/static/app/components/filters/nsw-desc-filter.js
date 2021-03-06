(function (angular) {
	"use strict";
	angular.module('platform').filter('nswDesc', ['platformWordCountSvc', function (platformWordCountSvc) {
		return function (desc, size, isByte) {
			desc = desc || '';
			var length = isByte ? platformWordCountSvc.count(desc) : desc.length;
			size = size || length;
			if (length && length > size) {
				if (isByte) {
					desc = platformWordCountSvc.slice(desc, 0, size) + '...';
				} else {
					desc = desc.slice(0, size) + '...';
				}
			}
			return desc;
		};
	}]);
}(angular));
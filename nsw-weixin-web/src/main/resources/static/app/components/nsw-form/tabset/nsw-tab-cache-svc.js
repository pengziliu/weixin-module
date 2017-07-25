(function (angular) {
	"use strict";
	
	
	function NswTabCache($http, $q, $templateCache) {
		this.$http = $http;
		this.$q = $q;
		
		this.loadTemplate = function (url) {
			var defer = $q.defer();
			var data = $templateCache.get(url);
			
			if (data) {
				defer.resolve(data);
			} else {
				$http.get(globals.basAppRoute + url).then(function(res){
					defer.resolve(res.data);
					$templateCache.put(url, res.data);
				});
			}
			return defer.promise;
		};
		
		this.loadTemplates = function (urls) {
			var promises = [], self = this;
			_.forEach(urls,function(url){
				promises.push(self.loadTemplate(url));
			});
			return $q.all(promises);
		};
	}
	
	NswTabCache.$inject = ['$http', '$q', '$templateCache']
	angular.module('platform').service('nswTabCacheSvc', NswTabCache);
}(angular));
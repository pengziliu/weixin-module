/*global angular*/
(function(angular) {
	"use strict";
	angular.module('platform', ['ng', 'ui.router', 'ui.bootstrap', 'ngStorage', 'ngTable', 'pascalprecht.translate'])
		.config(['$translateProvider', '$httpProvider', function($translateProvider, $httpProvider) {
			$httpProvider.interceptors.push('platformHttpInterceptor');
			$translateProvider.useStaticFilesLoader({
				files: [{ 
					prefix: globals.basAppRoute + 'components/content/json/validation-',
					suffix: '.json'
				}]
			});
			$translateProvider.preferredLanguage('zh');
		}]);
}(angular));
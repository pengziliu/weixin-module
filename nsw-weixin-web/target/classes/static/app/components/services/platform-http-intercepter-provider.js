(function(angular) {
	"use strict";
	angular.module('platform').factory('platformHttpInterceptor', ['$injector', '$location', function($injector, $location) {

		var checkingSessiong = false;
		var checkSession = function checkSession() {
			if (checkingSessiong) {
				return;
			}
			//如果没有实现登出，则10秒内不能多次访问，防止接口重复调度。
			setTimeout(function() {
				checkingSessiong = false;
			}, 10000);

			checkingSessiong = true;
			var http = $injector.get('$http');
			http.get('/wx/user/sessionIsAlive').then(function(res) {
				if (res.data && res.data.data && res.data.data.code === 10001) {
					logout();
				}
			});
		};
		var logout = function logout() {
			confirm('登陆超时，系统将跳转到登陆页！');
			window.location = '/wx/j_spring_cas_security_logout';
		};

		var interceptor = {
			'request': function(config) {
				return config; // or $q.when(config);
			},
			'response': function(response) {
				if (response.data.isSuccess === false && response.data.state === 401) {
					logout();
				}
				if (typeof response.data === 'string') {
					if (response.data.indexOf instanceof Function &&
						response.data.indexOf('<div id="login_wrap" style="height: 775px;">') !== -1) {
						logout();
					}
				}
				return response; // or $q.when(config);
			},
			'requestError': function(rejection) {
				return rejection; // or new promise
			},
			'responseError': function(rejection) {
				if (rejection.status === 401) {
					logout();
				} else {
					checkSession();
				}
				return rejection; // or new promise
			}
		};
		return interceptor;
	}]);
}(angular));
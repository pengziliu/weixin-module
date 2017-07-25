(function (angular){
	"use strict";
	angular.module('platform').directive('ngtableCtrlLabelCheck', [
		function() {
			var template = '<label ng-click="_check()"><i class="icon" ng-class="{true:\'icon-sm-checkbox-on\', false:\'icon-sm-checkbox-off\'}[checkStat]"></i>'+
							'<span ng-class="spanc">{{label}}</span></label>';
			return {
				scope: true,
				require: 'ngModel',
				replace: true,
				template: template,
				link: function(scope, element, attrs, ctrl) {
					scope.label = attrs.label;
					scope.spanc = attrs.spanclass;

					scope.checkStat = !!ctrl.$viewValue;

					attrs.check = attrs.check || false;

					scope._check = function check(){
						if (attrs.check) {
							scope.$eval(attrs.check);
							return;
						}
						scope.checkStat = !scope.checkStat;
						ctrl.$setViewValue(scope.checkStat);
					};

					ctrl.$render = function $render() {
						scope.checkStat = ctrl.$viewValue || false;
					};

				}
			};
		}]);
})(angular);
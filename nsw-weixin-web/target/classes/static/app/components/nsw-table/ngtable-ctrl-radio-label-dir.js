(function (angular){
	"use strict";
	angular.module('platform').directive('ngtableCtrlLabelRadio', [
		function() {
			var template = '<label ng-click="_check()"><i class="icon" ng-class="{true:\'icon-sm-radio-on\', false:\'icon-sm-radio-off\'}[checkStat]"></i>'+
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
					attrs.radioClick = attrs.radioClick || '';

					var referClick = function referClick() {
						if (attrs.radioClick) {
							scope.$eval(attrs.radioClick);
						}
					};

					scope._check = function check(){
						if (attrs.check) {
							scope.$eval(attrs.check);
							return;
						}
						scope.checkStat = !scope.checkStat;
						ctrl.$setViewValue(scope.checkStat);
						referClick();
					};

					ctrl.$render = function $render() {
						scope.checkStat = ctrl.$viewValue || false;
					};

				}
			};
		}]);
})(angular);
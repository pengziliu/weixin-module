(function(angular){
	'use strict';

	angular.module('platform').directive('ngtableRadioGroup', [
		function(){
			var template = '<label ng-class="labelc" ng-repeat="item in list" ng-click="_click(item)">' +
					'<i class="icon" ng-class="{true:\'icon-sm-radio-on\', false:\'icon-sm-radio-off\'}[item.checked]"></i>' +
					'<span ng-class="spanc">{{item.label}}</span>' +
				'</label>';
			return {
				replace : true,
				require : 'ngModel',
				template : template,
				scope : true,
				link : function(scope, element, attrs, ngModel){

					function checkedItem(){
						_.forEach(scope.list, function(item){
							item.checked = item.value === ngModel.$viewValue;
						});
					}

					// options : [{labe, value, checked}]
					scope.list = scope.$eval(attrs.options) || [];

					scope.spanc = attrs.spanclass;
					scope.labelc = attrs.labelclass;


					scope._click = function(item){
						_.forEach(scope.list, function(option){
							option.checked = false;
						});
						item.checked = true;
						ngModel.$setViewValue(item.value);

						if(attrs.selected){
							scope.$eval(attrs.selected, {selectedItem:item});
						}
					};

					checkedItem();
					ngModel.$render = function(){
						checkedItem();
					};
				}
			};
		}
	]);
})(angular);

;(function (angular) {
	"use strict";
	
	angular.module("platform").directive("nswFormRow", [
		function () {
			return {
				restrict: 'A',
				transclude: true,
				scope: true,
				templateUrl: globals.basAppRoute + 'components/nsw-form/container/nsw-form-row.html',
				link: function (scope, element, attrs) {
					scope.input = {};
					scope.inputVisible = false;
					scope.hasLabel = attrs.hasLabel !== 'false';
					scope.hasValidate = attrs.noneValidate !== 'true' || attrs.hasValidateTip !== 'false';
					scope.newBlankEditor = angular.isDefined(attrs.newBlankEditor);
					var getInputElement = function getInputElement() {
						return $(element.find('[ng-model], [data-ng-model]')[0]);
					};
					
					var getNgModel = function getNgModel() {
						var input = getInputElement();
						if (!input[0]) {
							return;
						}
						return input.data('$ngModelController');
					};
					
					var initLabel = function initLabel() {
						scope.label = attrs.nswLabel || attrs.nswFormRow;
						var multiLable = scope.label.split('|');
						scope.label = multiLable[0];
						scope.label2 = multiLable[1];
					};
					
					var initErrors = function initErrors() {
						var ngModel = getNgModel();
						if (ngModel) {
							scope.errors = ngModel.$error;
						}
					};
					
					var initScopeVariables = function initScopeVariables() {
						var model = getNgModel();
						//var errors = (model || {}).$error || {};
						var isRequlred = scope.input && scope.input.element && ( scope.input.element.attr('required') || scope.input.element.attr('nsw-min-length'))
						_.extend(scope.input, {
							ngModel: model,
							element: getInputElement(),
							label: scope.label,
							isRequired: isRequlred
						});
					};
					
					var watcher = scope.$watch(function () {
						return !!$('[ng-model],[data-ng-model]', element).length;
					}, function (val) {
						scope.inputVisible = val;
						initLabel();
						initErrors();
						initScopeVariables();
					});
					
					var modelWatcher = scope.$watch(function () {
						return (getNgModel() || {}).$error;
					}, function () {
						initScopeVariables();
					}, true);
					
					initLabel();
					initErrors();
					initScopeVariables();
					
					attrs.$observe('noneValidate', function () {
						scope.hasValidate = attrs.noneValidate !== 'true';
					});
					
					scope.$on('$destroy', function () {
						watcher();
						modelWatcher();
					});
				}
			};
		}
	]);
}(angular));

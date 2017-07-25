/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular){
    "use strict";
    angular.module('platform').directive('ngtableCtrlState', [
        function() {
            return {
                scope: true,
                require: 'ngModel',
                //template: '<i class="ng-table-icon" ng-class="{true:\'yes\', false:\'no\'}[isChecked]" ng-click="onClick($event)"></i>',
                template: '<i class="icon" ng-class="{true:\'icon-sm-radio-green\', false:\'icon-sm-radio-off\'}[isChecked]" ng-click="onClick($event)"></i>',
                link: function(scope, element, attrs, ctrl) {

                    attrs.stateClick = attrs.stateClick || '';
                    scope.isChecked = !!ctrl.$viewValue;

                    ctrl.$render = function $render(){
                        scope.isChecked = !!ctrl.$viewValue;
                    };

                    scope.onClick = function onClick(e){
                        e.stopPropagation();
                        if(element.attr('disabled')){
                            return;
                        }

                        scope.isChecked = !scope.isChecked;
                        ctrl.$setViewValue(scope.isChecked);

                        if(attrs.stateClick){
                            scope.$parent.$eval(attrs.stateClick);
                        }
                    };
                }
            };
        }]);
})(angular);

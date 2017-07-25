/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular){
    "use strict";
    angular.module('platform').directive('ngtableTreeColumn', [
        function() {
            return {
                scope: true,
                require: 'ngModel',
                template: '<!--<span class="t-indent"></span>-->'+
                '<span class="t-title">{{title}}</span>' +
                '<span class="t-indent t-tree-icon"'+
                ' ng-click="_toggleRowFun()"'+
                ' ng-class="{\'down\': collapsed, \'right\': !collapsed}"'+
                ' ng-show="item.children || item.hasChildren">'+
                '</span>'+
                '<a class="t-fastedit" ng-show="_fastEditCode()" title="快速编辑"'+
                ' ng-click="_fastEdit(item)"><i class="page-icon icon-edit"></i></a>',
                link: function(scope, element, attrs, ctrl){

                    attrs.fastAuth = attrs.fastAuth || '';
                    attrs.ngtableTreeColumn = attrs.ngtableTreeColumn || 'row';

                    scope.item = scope.$eval(attrs.ngtableTreeColumn) || {};
                    scope.collapsed = true;
                    if(!_.isEmpty(scope.originCollapsed._pids)){
                        scope.collapsed = _.find(scope.originCollapsed, function(o, index){
                            return index === scope.item._id;
                        });
                    }
                    scope.tindent = function tindent(node) {
                        if (!node) {
                            return;
                        }
                        var attr = node.path.split(',');
                        _.remove(attr, function(item){
                            return !item;
                        });
                        if (node.children || node.hasChildren) {
                            attr.pop();
                        }
                        var dom = '';
                        for (var i = 0; i < attr.length; i ++) {
                            dom += '<span class="t-indent"></span>';
                        }
                        element.prepend(dom);
                    };

                    scope._toggleRowFun = function toggleRowFun() {
                        scope.collapsed = !scope.collapsed;
                        scope.toggleData(scope.item, scope.collapsed);
                    };

                    scope._fastEdit = function fastEdit() {
                        scope.$eval(attrs.fastEdit);
                    };

                    scope._fastEditCode = function faseEditCode() {
                        return attrs.fastAuth ? scope.checkAuthed(attrs.fastAuth) : true;
                    };

                    var bindTitleClick = function bindTitleClick() {
                        if (scope._fastEditCode()) {
                            element.find('.t-title').css('cursor', 'pointer');
                            element.find('.t-title').click(function () {
                                scope.$eval(attrs.nswClick);
                            });
                        }
                    };

                    var checkTitleBold = function checkTitleBold() {
                        var path = (scope.item.path || '').replace(/^,|,$/g,'').split(',');
                        if (path.length === 1) {
                            element.find('.t-title').css('font-weight', 'bold');
                        }
                    };

                    scope.$evalAsync(function(){
                        scope.title = ctrl.$viewValue || '';
                        bindTitleClick();
                        checkTitleBold();
                        //scope.tindent(scope.item);
                    });
                }
            };
        }]);
})(angular);
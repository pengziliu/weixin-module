/**
 * Created by jiangw on 2016/10/26.
 */
(function (angular){
    "use strict";
    angular.module('platform').directive('ngtableCtrlCheck', [
        function() {
            return {
                scope: true,
                require: 'ngModel',
                replace: true,
                template: '<i class="icon" ng-click="_check()" ng-class="{true:\'icon-sm-checkbox-on\', false:\'icon-sm-checkbox-off\'}[checkStat]"></i>',
                link: function(scope, element, attrs, ctrl) {
                    var isTree = attrs.ngtableCtrlCheck==='tree',
                        dataList = null;

                    scope.checkStat = !!ctrl.$viewValue;

                    attrs.check = attrs.check || false;

                    var getList = function getList() {
                        if(dataList){
                            return dataList;
                        }
                        return (dataList = scope.$eval(attrs.list));
                    };


                    //判断相同的checkBox是否是全部选中。
                    function checkedStatus(_path) {
                        var status = true;
                        _.forEach(getList(), function(item){
                            if (item.path === _path) {
                                if (!item.isChecked) {
                                    return (status = false);
                                }
                            }
                        });
                        return status;
                    }

                    // 父级节点处理 子级节点
                    var checkSelectedChildren = function(parent){
                        var list = getList();
                        var parentPath = parent.path.split(',');
                        _.forEach(list, function(sub){
                            var tmp = sub.path.split(',');
                            if (tmp.length > parentPath.length && tmp[tmp.length - 2] === parent._id) {
                                sub.isChecked = parent.isChecked;
                                checkSelectedChildren(sub);
                            }
                        });
                    };

                    // 子节点处理父节点
                    var checkSelectedParent = function(sub){
                        var subPath = sub.path.split(',');
                        var pid = subPath[subPath.length - 2];
                        if (!checkedStatus(sub.path)) {
                            _.forEach(getList(), function(item){
                                if (item._id === pid) {
                                    item.isChecked = false;
                                    checkSelectedParent(item);
                                }
                            });
                        }
                    };


                    function checkChilds(){
                        var _current = scope.$parent.row;
                        checkSelectedChildren(_current);
                        //checkSelectedParent(_current);
                    }

                    scope._check = function check(){
                        if (attrs.check) {
                            scope.$eval(attrs.check);
                            return;
                        }
                        scope.checkStat = !scope.checkStat;
                        ctrl.$setViewValue(scope.checkStat);

                        if(isTree){
                            checkChilds();
                        }
                    };

                    ctrl.$render = function $render() {
                        scope.checkStat = ctrl.$viewValue || false;
                    };

                }
            };
        }]);
})(angular);
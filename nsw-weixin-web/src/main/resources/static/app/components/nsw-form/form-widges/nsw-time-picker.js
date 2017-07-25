/*globals moment*/
(function (angular) {
    "use strict";

    angular.module('platform').directive('nswTimePicker', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            templateUrl: globals.basAppRoute + 'components/nsw-form/templates/nsw-time-picker.html',
            scope:{
                options : "="
            },
            link: function (scope, element, attrs, ctrl) {
                var _datetimepicker;
                scope.showDelete = attrs.showDelete !== 'false';
                scope.backData = {};
                scope.size = attrs.size||'size-sm';
                var init = function init() {
                    var defaultOpt = {
                        locale: {
                            format: attrs.format || "YYYY-MM-DD HH:mm",
                            language: 'zh-CN', 'daysOfWeek': [
                                '日', '一', '二', '三', '四', '五', '六'
                            ],
                            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十月', '十二月'],
                            applyLabel: '确认',
                            cancelLabel: '取消'
                        },
                        singleDatePicker: true,
                        timePicker: true,
                        timePicker24Hour: true,
                        timePickerSeconds: true,
                        // maxDate: '2100-12-30',
                        // minDate: ctrl.$viewValue,
                        //startDate: ctrl.$viewValue,
                        showDelete: scope.showDelete
                    };
                    if (scope.options && scope.options.showDelete) {
                        scope.showDelete = scope.options.showDelete;
                    }
                    var opt = angular.extend({}, defaultOpt, scope.options);
                    
                    if( scope.$eval(attrs.currentTime) ){
                        var ctrlValue = moment(ctrl.$viewValue);
                        var now = moment();
                        if( ctrlValue.isAfter(now) ) { //
                            opt.minDate = now.format(opt.locale.format);
                        }
                    }
                    
                    if (scope.options && scope.options.locale) {
                        opt.locale = angular.extend({}, defaultOpt.locale, scope.options.locale);
                    }
                    element.find('.glyphicon-calendar').click(
                        function(){
                            _datetimepicker.click();
                        }
                    );
                    _datetimepicker = element.find('input').daterangepicker(opt, function (start) {
                        //var format = defaultOpt.locale.format;
                        ctrl.$setViewValue(moment(start).format(opt.locale.format));
                        scope.$apply();

                    });

                    _datetimepicker.val(ctrl.$viewValue);
                };

                var clearDisplay = function clearDisplay(){
                    element.find('input').val('');
                };

                scope.deleteTime = function deleteTime() {
                    scope.backData.start = '';
                    clearDisplay();
                };

                ctrl.$render = function $render(){
                    var value = ctrl.$viewValue;
                    if(value){
                        init();
                    } else {
                        clearDisplay();
                    }

                    if(_datetimepicker) {
                        _datetimepicker.val(value);
                    }
                };

                // scope.$evalAsync(function () {
                //     init();
                // });

            }
        };
    }]);

}(angular));
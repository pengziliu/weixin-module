(function (angular) {
	"use strict";
	var index = 0;
	
	var styleTemplate = '<style>div[name="%formName%"] .form-row-label label{width:%labelWidth%px;min-height: 1px;word-wrap: break-word;}</style>';
	
	/*labelWidth 设置标准的LABLE宽度，否则自动计算
	 * autoFixed 为false时不会自动算表单的宽度*/
	angular.module('platform').directive('nswForm', [function () {
		return {
			templateUrl: globals.basAppRoute + 'components/nsw-form/container/nsw-form.html',
			transclude: true,
			link: function (scope, element, attr) {
				var autoFixed = attr.autoFixed === 'true'; //为true时表单会自动分配label和输入框的宽度，使两者加起来刚好是表单的宽度
				scope.$$nsw_form_name = 'nswForm' + index++;
				var syncLabelWidth = function syncLableWidth() {
					$('.labelWidthClass', element).html('');
					var labelWidth = Number(attr.labelWidth) || _.max(_.map($('.form-row-label', element), function (el) {
							$(el).css({width: 'auto'});
							return $(el).width();
						}));
					labelWidth = labelWidth < 10 ? 50 : labelWidth;
					scope.$$nswFormLabelWidth = labelWidth;
					var css = styleTemplate.replace(/%formName%/g, scope.$$nsw_form_name).replace(/%labelWidth%/g, labelWidth + 15);
					$('.labelWidthClass', element).html(css);
					
					if (!element.parents(".nsw-tab").hasClass("ng-hide")) {
						$('.tab-footer').css("paddingLeft", labelWidth + 15);
					}
					
					if (autoFixed) {
						var rowWidth = $('.form-row', element).width();
						var rowContentWidth = rowWidth - labelWidth - 15;
						$('.form-row-content', element).not('.form-row-content *').width(rowContentWidth || 700);
					}
					
					$('.modal-footer', element).css("paddingLeft", labelWidth + 15);
				};
				
				scope.$evalAsync(function () {
					syncLabelWidth();
				});
				
				var labelWatcher = scope.$watch(function () {
					return $('.form-row-label', element).length;
				}, syncLabelWidth);
				
				scope.$on('tabSelected', function () {
					setTimeout(syncLabelWidth);
				});
				scope.$on('platformFormChanged', function () {
					setTimeout(syncLabelWidth);
				});
				
				scope.$on('$destroy', function () {
					labelWatcher();
				});
			}
		};
	}]);
}(angular));
/*globals*/
(function (angular) {
	"use strict";
	angular.module('platform').directive('platformPreview', ['$modal', '$parse','$http', 'platformPreviewSvc',
		function ($modal, $parse,$http, platformPreviewSvc) {
			return {
				restrict: 'A',
				require: '?ngModel',
				scope:{
					information:'=',
					infoType:'='
				},
				link: function (scope, element) {

					element.bind('click', function (e) {
						var options ;
						scope.currentItem = angular.copy(scope.information);
						if(scope.currentItem.articles&&scope.currentItem.articles.length===1){
							scope.currentItem.articles[0].digest =scope.currentItem.articles[0].digest|| window.deletHtmlTag(scope.currentItem.articles[0].content.replace(/&nbsp;/ig,' ')).slice(0, 54);
							options = scope.currentItem;
						}else{
							options = scope.currentItem;
						}

						var type = scope.infoType||'';
						e.stopPropagation();
						platformPreviewSvc.showPreveivModal(options,type);
								//.then(function (image) {
								//	//if (image) {
								//	//	if (ngModel) {
								//	//		ngModel.$setViewValue(image);
								//	//	}
								//	//	scope.afterSelect({image: image});
								//	//}
								//});
					});
				}
			};
		}]);

}(angular));
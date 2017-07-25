/**
 * Created by yaoyc on 2016/9/6.
 */

/*global angular*/
(function (angular) {
    "use strict";
    angular.module('qrCode').controller('qrCodeDownload', ['$scope', 'QRCodeSvc',
        function ($scope, QRCodeSvc) {
            $scope.getQrCodeSize = function getQrCodeSize(size){
                QRCodeSvc.getQrCodeSize($scope.modalOptions.url,size);
            };

        }]);
}(angular));

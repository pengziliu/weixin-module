/**
 * Created by yaoyc on 2016/9/9.
 */

/*global module, inject*/
/* jasmine specs for services go here */
describe('serviceTest', function() {
    'use strict';
    describe('Test QRCodeSvc', function() {
        //mock module
        beforeEach(module('qrCode'));

        it('qrCodeService should return 2',
            inject(function($injector) {

                //模拟返回数据
                var valid_respond ='{"data":{"ticket":"gQH08DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0IwT0JXOFhtSDRCbVhrR0tCbV95AAIEe5fSVwMEAAAAAA==","url":"http://weixin.qq.com/q/B0OBW8XmH4BmXkGKBm_y","scene_id":"97863"},"isSuccess":true}';
                var $httpBackend = $injector.get('$httpBackend');
                $httpBackend.whenGET(globals.basAppRoot+'qrCodeMana/getQrCodeUrl?type=forever').respond(valid_respond);

                // 通过injector得到service，就像在前面的例子中得到$httpBackend一样
                var qrCodeSvc = $injector.get('QRCodeSvc');
                var promise = qrCodeSvc;
                var userNum;
                promise.getQrUrl().then(function(data){
                    userNum = data;
                });

                //强迫httpBackend返回数据
                $httpBackend.flush();

                //通过injector得到$rootScope
                var $rootScope = $injector.get('$rootScope');
                //强迫传递到当前作用域
                $rootScope.$apply();

                //测试判断userNum是否为2
                expect(userNum.scene_id).toEqual('97863');
            }));

    });
    describe('Test QRCodeSvc', function() {
        //mock module
        beforeEach(module('qrCode'));

        it('qrCodeService should return success',
            inject(function($injector) {

                //模拟返回数据
                var valid_respond ='{"data":{"dataList":[{"_id":"57cfaa0c1b1264f572232f79","_class":"com.nsw.wx.common.docmodel.QrCode","appId":"wx6628d33ac319e694","title":"bbbbb","type":"forever","reply":false,"replyType":"txt","scanNum":0,"scanFollowNum":0,"addFollowNum":0,"createTime":"2016-09-07 13:47:56","updateTime":"2016-09-07 13:47:56","qrCodeUrl":"d3b91763f6cf48ed973e9ec207e3c859.png","scene_id":"9104","url":"http://weixin.qq.com/q/J0MI7Mnlc4AKxWHYj2_y","style":"personality","id":"57cfaa0c1b1264f572232f79"},{"_id":"57cd0d531b1289c65040e4fa","_class":"com.nsw.wx.common.docmodel.QrCode","appId":"wx6628d33ac319e694","title":"wwww","type":"forever","reply":false,"replyType":"txt","scanNum":1,"scanFollowNum":1,"addFollowNum":0,"createTime":"2016-09-05 14:14:43","updateTime":"2016-09-07 10:19:03","qrCodeUrl":"e4307620ebcd462c8774774dc19ae165.png","scene_id":"30525","url":"http://weixin.qq.com/q/tUOoOlPmIoBbG-P-L2_y","style":"personality","groupId":null,"replyContent":null,"remark":null,"scanDate":"2016-09-05","id":"57cd0d531b1289c65040e4fa"},{"_id":"57c924251b12397c62409761","_class":"com.nsw.wx.common.docmodel.QrCode","appId":"wx6628d33ac319e694","title":"cccc","type":"forever","reply":false,"replyType":"txt","scanNum":1,"scanFollowNum":1,"addFollowNum":0,"createTime":"2016-09-02 15:03:01","updateTime":"2016-09-06 18:55:41","qrCodeUrl":"bdbabd857fa34712b10db4078c7ff7d8.png","scene_id":"82050","url":"http://weixin.qq.com/q/Q0OhrR-mLYBUNgVuJm_y","style":"normal","scanDate":"2016-09-02","groupId":null,"replyContent":null,"remark":null,"id":"57c924251b12397c62409761"}],"totalRows":3,"totalPages":1},"isSuccess":true}';
                var $httpBackend = $injector.get('$httpBackend');
                $httpBackend.whenGET(globals.basAppRoot+'qrCodeMana/getQrCodeUrl?type=forever').respond(valid_respond);

                // 通过injector得到service，就像在前面的例子中得到$httpBackend一样
                var qrCodeSvc = $injector.get('QRCodeSvc');
                var promise = qrCodeSvc;
                var userNum;
                promise.getQrUrl().then(function(data){
                    userNum = data;
                });

                //强迫httpBackend返回数据
                $httpBackend.flush();

                //通过injector得到$rootScope
                var $rootScope = $injector.get('$rootScope');
                //强迫传递到当前作用域
                $rootScope.$apply();

                //测试判断userNum是否为2
                expect(userNum.scene_id).toEqual('97863');
            }));

    });
});
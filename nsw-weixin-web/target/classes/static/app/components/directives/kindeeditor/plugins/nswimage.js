/*globals KindEditor, _*/
(function (angular) {
	"use strict";

	angular.module('platform').factory('nswimagePluginSvc', ['platformImgLibSvc', 'nswGlobals', '$rootScope', function (platformImgLibSvc, nswGlobals, $rootScope) {
		var service = {};
		service.init = function init() {
			KindEditor.plugin('nswimage', function () {
				var self = this, name = 'nswimage', attrs = null;

				self.lang({
					'nswimage': '从图片库中选择图片'
				});
				
				var getBlockParent = function getBlockParent(node) {
					while (node && !node.isBlock()) {
						node = node.parent();
					}
					return node;
				};
				
				var isStringEmpty = function isStringEmpty(str){
					return !(str || '').replace(/\s{1,}|\u200B{1,}/ig,'');
				};
				
				
				/*var img = window.KindEditor('<img/>');
				 img.attr('src', url);
				 img.attr('data-ke-src', url);
				 img.attr('title', (image.name || image.fileName));
				 img.attr('alt', (image.name || image.fileName));
				 img.attr('width', 320);
				 
				 var p = window.KindEditor('<p></p>');
				 p.css('text-indent', '0px');
				 p.css('text-indent', '0px');
				 p.css('padding-top', '14px');
				 p.css('margin', '0px');
				 p.css('text-align', image.align);*/
				var createImage = function createImage(image) {
					var url = image.fileId;
					if (!/^[http|https]/g.test(image.fileId)) {
						url = globals.basImagePath + url;
					}
					var img = window.KindEditor('<img/>');
					img.css("max-width", "100%");
					img.attr('src', url);
					img.attr('data-ke-src', url);
					img.attr('align', image.align);
					img.attr('title', (image.name || image.fileName));
					img.attr('alt', (image.name || image.fileName));
					return img;
				};
				
				
				var createP = function createP(parentNode, img, attrs, align) {
					//var p = parentNode;
					if (parentNode.name === 'body') {
						if (parentNode.children().length === 1) {
							if (parentNode.first().name === 'p') {
								parentNode = parentNode.first();
							} else if (parentNode.first().isBlock()) {
								parentNode = parentNode.first();
								parentNode.append('<p></p>');
								parentNode = parentNode.last();
							} else {
								parentNode.append('<p></p>');
								parentNode = parentNode.last();
							}
						} else {
							parentNode.append('<p></p>');
							parentNode = parentNode.last();
						}
						self.cmd.range.setStart(parentNode, 0);
						self.cmd.range.setEnd(parentNode, 0);
					}
					
					//删掉空的文本块
					if(parentNode.name === 'p'){
						_.forEach(parentNode.children(),function(child){
							if(child.nodeName === '#text' && isStringEmpty(child.nodeValue)){
								child.remove();
							}
						});
					}
					
					if (parentNode.name !== 'p' || KindEditor('img', parentNode).length) {
						parentNode.after('<p></p>');
						parentNode = parentNode.next();
					} else if (parentNode.name === 'p' && parentNode.first() && parentNode.first().name === 'br') {
						parentNode.first().remove();
					}
					parentNode.css('text-align', 'center');
					parentNode.css('text-indent', '0px');
					parentNode.css('padding-top', '14px');
					parentNode.css('margin', '0px');
					if (attrs) {
						parentNode.attr(attrs);
					}
					parentNode.append(img);
					return parentNode;
				};
				
				var appendImage = function appendImage(image) {
					var isTextBlock = !isStringEmpty(self.cmd.range.startContainer.textContent);
					var rangeEndNode = KindEditor.range(self.container.doc);
					rangeEndNode.selectNode(KindEditor(self.cmd.range.endContainer)[0]);
					var isInTheEnd = self.cmd.range.compareBoundaryPoints(KindEditor.END_TO_START, rangeEndNode) >= 0;
					isTextBlock = isTextBlock && !isInTheEnd;
					var img = createImage(image);
					
					if (isTextBlock) {
						self.cmd.range.insertNode(img[0]);
						self.cmd.range.setStartAfter(img[0]);
					} else {
						var parent = getBlockParent(KindEditor(self.cmd.range.startContainer));
						var p = createP(parent, img, attrs, image.align);
						self.cmd.range.setStartAfter(img[0]);
						return p;
					}
				};

				var updateDisplay = function updateDisplay(img, doc) {
					attrs = null;
					appendImage(img);
					self.sync();//同步数据
					KindEditor(doc).fire('mouseup');
					self.blur();
				};

				var showImageDialog = function showImageDialog(doc) {
					return platformImgLibSvc.showImgLibModal({
							count: 1,
							size: 300,
							width: 800,
							height: 800,
							ext: 'gif,jpg,jpeg,bmp,png'
						})
						.then(function (image) {
							updateDisplay(image, doc);
						});
				};

				self.plugin.nswmultiimage = {
					edit: function () {
						showImageDialog($(this.container[0]).find('iframe')[0].contentDocument);
					}
				};

				self.clickToolbar(name, self.plugin.nswmultiimage.edit);
			});
		};
		return service;
	}]);
}(angular));
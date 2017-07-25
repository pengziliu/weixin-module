(function (angular) {
	"use strict";
	angular.module('platform').factory('platformWechatEmotionSvc', [function () {
		var service = {},
			emotions = [{code: '/微笑', key: '/::)', desc: '微笑', img: 0},
				{code: '/撇嘴', key: '/::~', desc: '撇嘴', img: 1},
				{code: '/色', key: '/::B', desc: '色', img: 2},
				{code: '/发呆', key: '/::|', desc: '发呆', img: 3},
				{code: '/得意', key: '/:8-)', desc: '得意', img: 4},
				{code: '/流泪', key: '/::<', desc: '哭', img: 5},
				{code: '/害羞', key: '/::$', desc: '羞', img: 6},
				{code: '/闭嘴', key: '/::X', desc: '哑', img: 7},
				{code: '/睡', key: '/::Z', desc: '睡', img: 8},
				{code: '/大哭', key: '/::\'(', desc: '哭', img: 9},
				{code: '/尴尬', key: '/::-|', desc: '囧', img: 10},
				{code: '/发怒', key: '/::@', desc: '怒', img: 11},
				{code: '/调皮', key: '/::P', desc: '调皮', img: 12},
				{code: '/呲牙', key: '/::D', desc: '笑', img: 13},
				{code: '/惊讶', key: '/::O', desc: '惊讶', img: 14},
				{code: '/难过', key: '/::(', desc: '难过', img: 15},
				{code: '/酷', key: '/::+', desc: '酷', img: 16},
				{code: '/冷汗', key: '/:--b', desc: '汗', img: 17},
				{code: '/抓狂', key: '/::Q', desc: '抓狂', img: 18},
				{code: '/吐', key: '/::T', desc: '吐', img: 19},
				{code: '/偷笑', key: '/:,@P', desc: '笑', img: 20},
				{code: '/:,@-D', key: '/:,@-D', desc: '愉快', img: 21},
				{code: '/白眼', key: '/::d', desc: '奇', img: 22},
				{code: '/傲慢', key: '/:,@o', desc: '傲', img: 23},
				{code: '/饥饿', key: '/::g', desc: '饿', img: 24},
				{code: '/困', key: '/:|-)', desc: '累', img: 25},
				{code: '/惊恐', key: '/::!', desc: '吓', img: 26},
				{code: '/流汗', key: '/::L', desc: '汗', img: 27},
				{code: '/憨笑', key: '/::>', desc: '高兴', img: 28},
				{code: '/::,@', key: '/::,@', desc: '闲', img: 29},
				{code: '/奋斗', key: '/:,@f', desc: '努力', img: 30},
				{code: '/咒骂', key: '/::-S', desc: '骂', img: 31},
				{code: '/疑问', key: '/:?', desc: '疑问', img: 32},
				{code: '/嘘', key: '/:,@x', desc: '秘密', img: 33},
				{code: '/晕', key: '/:,@@', desc: '乱', img: 34},
				{code: '/::8', key: '/::8', desc: '疯', img: 35},
				{code: '/:,@!', key: '/:,@!', desc: '哀', img: 36},
				{code: '/骷髅', key: '/:!!!', desc: '鬼', img: 37},
				{code: '/敲打', key: '/:xx', desc: '打击', img: 38},
				{code: '/再见', key: '/:bye', desc: 'bye', img: 39},
				{code: '/擦汗', key: '/:wipe', desc: '汗', img: 40},
				{code: '/抠鼻', key: '/:dig', desc: '抠', img: 41},
				{code: '/鼓掌', key: '/:handclap', desc: '鼓掌', img: 42},
				{code: '/糗大了', key: '/:&-(', desc: '糟糕', img: 43},
				{code: '/坏笑', key: '/:B-)', desc: '恶搞', img: 44},
				{code: '/左哼哼', key: '/:<@', desc: '什么', img: 45},
				{code: '/右哼哼', key: '/:@>', desc: '什么', img: 46},
				{code: '/哈欠', key: '/::-O', desc: '累', img: 47},
				{code: '/鄙视', key: '/:>-|', desc: '看', img: 48},
				{code: '/委屈', key: '/:P-(', desc: '难过', img: 49},
				{code: '/快哭了', key: '/::\'|', desc: '快哭了', img: 50},
				{code: '/阴险', key: '/:X-)', desc: '坏', img: 51},
				{code: '/亲亲', key: '/::*', desc: '亲', img: 52},
				{code: '/吓', key: '/:@x', desc: '吓', img: 53},
				{code: '/可怜', key: '/:8*', desc: '可怜', img: 54},
				{code: '/菜刀', key: '/:pd', desc: '刀', img: 55},
				{code: '/西瓜', key: '/:<W>', desc: '水果', img: 56},
				{code: '/啤酒', key: '/:beer', desc: '酒', img: 57},
				{code: '/篮球', key: '/:basketb', desc: '篮球', img: 58},
				{code: '/乒乓', key: '/:oo', desc: '乒乓', img: 59},
				{code: '/咖啡', key: '/:coffee', desc: '咖啡', img: 60},
				{code: '/饭', key: '/:eat', desc: '美食', img: 61},
				{code: '/猪头', key: '/:pig', desc: '动物', img: 62},
				{code: '/玫瑰', key: '/:rose', desc: '鲜花', img: 63},
				{code: '/凋谢', key: '/:fade', desc: '枯', img: 64},
				{code: '/:showlove', key: '/:showlove', desc: '唇', img: 65},
				{code: '/爱心', key: '/:heart', desc: '爱', img: 66},
				{code: '/心碎', key: '/:break', desc: '分手', img: 67},
				{code: '/蛋糕', key: '/:cake', desc: '生日', img: 68},
				{code: '/闪电', key: '/:li', desc: '电', img: 69},
				{code: '/炸弹', key: '/:bome', desc: '炸弹', img: 70},
				{code: '/刀', key: '/:kn', desc: '刀', img: 71},
				{code: '/足球', key: '/:footb', desc: '足球', img: 72},
				{code: '/瓢虫', key: '/:ladybug', desc: '虫', img: 73},
				{code: '/便便', key: '/:shit', desc: '臭', img: 74},
				{code: '/月亮', key: '/:moon', desc: '月亮', img: 75},
				{code: '/太阳', key: '/:sun', desc: '太阳', img: 76},
				{code: '/礼物', key: '/:gift', desc: '礼物', img: 77},
				{code: '/拥抱', key: '/:hug', desc: '伙伴', img: 78},
				{code: '/强', key: '/:strong', desc: '赞', img: 79},
				{code: '/弱', key: '/:weak', desc: '差', img: 80},
				{code: '/握手', key: '/:share', desc: '握手', img: 81},
				{code: '/胜利', key: '/:v', desc: '优', img: 82},
				{code: '/抱拳', key: '/:@)', desc: '恭', img: 83},
				{code: '/勾引', key: '/:jj', desc: '勾', img: 84},
				{code: '/拳头', key: '/:@@', desc: '顶', img: 85},
				{code: '/差劲', key: '/:bad', desc: '坏', img: 86},
				{code: '/爱你', key: '/:lvu', desc: '爱', img: 87},
				{code: '/NO', key: '/:no', desc: '不', img: 88},
				{code: '/OK', key: '/:ok', desc: '好的', img: 89},
				{code: '/爱情', key: '/:love', desc: '爱', img: 90},
				{code: '/飞吻', key: '/:<L>', desc: '吻', img: 91},
				{code: '/跳跳', key: '/:jump', desc: '跳', img: 92},
				{code: '/发抖', key: '/:shake', desc: '怕', img: 93},
				{code: '/怄火', key: '/:<O>', desc: '尖叫', img: 94},
				{code: '/转圈', key: '/:circle', desc: '圈', img: 95},
				{code: '/磕头', key: '/:kotow', desc: '拜', img: 96},
				{code: '/回头', key: '/:turn', desc: '回头', img: 97},
				{code: '/跳绳', key: '/:skip', desc: '跳', img: 98},
				{code: '/:oY', key: '/:oY', desc: '天使', img: 99},
				{code: '/激动', key: '/激动', desc: '激动', img: 100},
				{code: '/:hiphot', key: '/:hiphot', desc: '跳舞', img: 101},
				{code: '/献吻', key: '/献吻', desc: '吻', img: 102},
				{code: '/左太极', key: '/左太极', desc: '瑜伽', img: 103},
				{code: '/右太极', key: '/右太极', desc: '太极', img: 104}],
			convertRegStringPattern = /\.*([|\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/])\.*/ig;
		
		service.getImagePath = function getImagePath(key) {
			return globals.basAppRoot + 'plugins/kindeditor/plugins/emoticons/images/' + key + '.gif';
		};
		
		function _escape(val) {
			return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		}
		
		function _unescape(val) {
			return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
		}
		
		service.imgToCode = function imgToCode(article) {
			article = article || '';
			article = article.replace(/<img[^>]+src\s*=\s*['\"][^'\"]+\/(\d+).gif?[^'\"]+['\"][^>]*>/ig, function (src, key) {
				return (_.find(emotions, {img: parseInt(key)}) || {}).code;
			});
			article = article.replace(/[\n|\r\n]/ig, ''); //把\n和\r\n都去掉
			article = article.replace(/(<a[^<]+)(<br\s+\/>)([^<]{0,}<\/a>)/ig, '$1$3\n'); //把a标签里面的换行都挪到a的外面
			article = article.replace(/&nbsp;/ig, ' ').replace(/<br\s*[\/?]>/ig, '\n'); //把BR换成\n
			
			article = _unescape(article);
			article = _.trimRight(article, '\n');
			return article;
		};
		
		service.codeToImg = function codeToImg(article) {
			article = article || '';
			//article = _escape(article);
			_.forEach(emotions, function (emotion) {
				var code = emotion.code.replace(convertRegStringPattern, '\\$1');
				var key = emotion.key.replace(convertRegStringPattern, '\\$1');
				var reg = new RegExp(code, 'ig');
				var regKey = new RegExp(key, 'ig');
				if (reg.test(article)) {
					article = article.replace(reg, '<img src="' + service.getImagePath(emotion.img) + '" alt="' + emotion.desc + '"/>');
				} else if (regKey.test(article)) {
					article = article.replace(regKey, '<img src="' + service.getImagePath(emotion.img) + '" alt="' + emotion.desc + '"/>');
				}
			});
			/*article = article.replace(/ /ig,'&nbsp;').replace(/\n/ig,'<br />');*/
			article = article.replace(/\n/ig, '<br />');
			article = article.replace(/[$|]\s/ig, '&nbsp;');
			
			return article;
		};
		
		service.getEmotions = function getEmotions() {
			return emotions;
		};
		
		return service;
	}]);
}(angular));
'use strict'

var config = require('./config/config');
var Wechat = require('./lib/wechat');
var menu = require('./lib/menu')

var wechatApi = new Wechat(config.wechat);

wechatApi.deleteMenu()
.then(function() {
  return wechatApi.createMenu(menu)
})
.then(function(msg) {
  console.log(msg);
})

module.exports.replay = function *(next) {
  var message = this.weixin;
  var MsgType = message.MsgType;

  console.log('log message :' + JSON.stringify(message));
  if (MsgType === 'event') {
    var event = message.Event,
    eventKey = message.EventKey,
    ticket = message.Ticket;
    if (event === 'subscribe') {
      if (eventKey) {
        console.log('扫二维表进来：' + eventKey + ' ' + ticket);
      }
      this.body = '您好，十分感谢关注“神驰摩配商行”公众号，希望您在此可以得到更有用的信息和帮助。';
    } else if (event === 'unsubscribe') {
      console.log('无情取关');
    } else if (event === 'LOCATION') {
       this.body = '你上报了位置 ' + eventKey
    } else if (event === 'CLICK') {
      if (eventKey === 'contact_us') {
        console.log('点击了联系我们，返回消息电话号码。');
        this.body = '0417-5826901\n0417-3180345'
      } else if (eventKey === 'help_address') {
        console.log('点击了帮助-地址');
        this.body = '辽宁省大石桥市五堪交通岗南五十米迦南小区道东。地址:http://j.map.baidu.com/4tTnF'
      } else if (eventKey === 'employ') {
        this.body = '暂无';
      } else if (eventKey === 'about_us') {
        console.log('点击了神驰-关于我们');
        this.body = "神驰摩配创立于1992年10月，起初设店”庆贺配件”在大石桥市哈大路酱油厂对过老织布厂，" +
        "进行了多次店面升级，分别搬迁至“水利小区”、“旺龙花园”和现在的”迦南小区“。历经24年，承蒙各位的关" +
        "心与支持,在此深表谢意。";
      } else if (eventKey === 'core') {
        console.log('点击了神驰-核心');
        this.body = "持续发展核心优势 核心价值观 诚信、责任、专业、创新、价值 我们立身处世,当以诚信为本;"
      } else if (eventKey === 'coupon') {
        console.log('点击了 信息咨询-最新优惠\r\n');
        this.body = "优惠信息如下：\r\n" +
        "一枝花内胎，买五赠一;\r\n" +
        "HRB轴承，买十赠一;\r\n" +
        "统一系列刀锋、尖峰、皇牌及重负荷机油，买一件赠一桶;\r\n" +
        "消音器，买五赠一;\r\n" +
        "正新轮胎,批发每条减五元;"
      }
    } else if (event === 'SCAN') {
      console.log('关注后扫描了二维码' + eventKey);
    } else if (event === 'VIEW') {
      this.body = '您点击了菜单中的链接: ' + eventKey;
    }
  } else if (MsgType === 'image') {
    this.body = '您点击了菜单中的链接: ' + 12;
  } else if (MsgType === 'text') {
    var content = message.Content;
    var replay;
    if (content === '1') {
      replay = [{
        title: '技术改变世界',
        description: '只是个插件',
        picurl: 'http://img.mukewang.com/5721dedf0001e0c401800180-200-200.jpg',
        url: 'nodejs.org'
      }, {
        title: 'Node.js 开发微信',
        description: '这是一个描述',
        picurl: 'http://img.mukewang.com/56f22f160001bac306000338-240-135.jpg',
        url: 'http://www.baidu.com'
      }];
    } else if (content === '2') {
      replay = '天下第一吃大米';
    } else if(content === '3'){
      replay = '天下第二吃豆腐';
    } else if (content === '4') {
      replay = '天下第三吃仙丹';
    } else if (content === '5') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg');
      // console.log(data);
      replay = {
        type: 'image',
        media_id: data.media_id
      }
    } else if (content === '6') {
      var data = yield wechatApi.uploadMaterial('video', __dirname + '/119.mp4')
      replay = {
        title: '一群鸽子',
        type: 'video',
        description: '都不怕人的啊',
        media_id: data.media_id
      }
    } else if (content === '大城小爱') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg')
      replay = {
        type: 'music',
        title: '大城小爱',
        description: '放松一下',
        MUSIC_Url: ' http://sc.111ttt.com/up/mp3/247978/A810FD430B41D801D983E958A5EABAD3.mp3',
        media_id: data.media_id
      }
    }  else if (content === '8') {
      var data = yield wechatApi.uploadMaterial('image', __dirname + '/2.jpg', {type: 'image'});
      // console.log(data);
      replay = {
        type: 'image',
        media_id: data.media_id
      }
    } else if (content === '9') {
      var data = yield wechatApi.uploadMaterial('video', __dirname + '/119.mp4', {type: 'video', description: '{"title": "Nice", "introduction": "哈哈哈"}'});
      console.log(data);
      replay = {
        type: 'video',
        media_id: data.media_id
      }
    } else {
      replay = "额，你说的:" + content + "，这句话太复杂了，我听不懂";
    }
    console.log(replay);
    this.body = replay;
  }
  yield next;
};

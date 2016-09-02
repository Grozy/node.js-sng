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
      this.body = '哈哈，你订阅了找个号\r\n' + ' 消息ID: ' + message.MsgId;
    } else if (event === 'unsubscribe') {
      console.log('无情取关');
    } else if (event === 'LOCATION') {
       this.body = '你上报了位置 ' + eventKey
    } else if (event === 'CLICK') {
      this.body = '您点击了菜单 ' + eventKey
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

'use strict'

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
  } else if (MsgType === 'text') {
    var content = message.Content;
    var replay;
    if (content === '1') {
      replay = [{
        title: '技术改变世界',
        description: '只是个插件',
        picurl: 'http://img.mukewang.com/5721dedf0001e0c401800180-200-200.jpg'
      },{
        title: 'Node.js 开发微信',
        description: '这是一个描述',
        picurl: 'http://img.mukewang.com/56f22f160001bac306000338-240-135.jpg'
      }];
    } else {
      replay = "额，你说的:" + content + "，这句话太复杂了，我听不懂";
    }
    this.body = replay;
  }
  yield next;
};

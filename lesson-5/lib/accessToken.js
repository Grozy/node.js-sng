// 'use strict'

var sha1 = require('sha1')
var Wechat = require('./wechat');
var getRowBody = require('raw-body');
var util = require('./utils');
var news = require('../templates/news');

module.exports = function(opts, handler){
  console.log("初始化accessToken");
  var wechat = new Wechat(opts);
  console.log('初始化wechat结束: ' + JSON.stringify(wechat));
  return function *(next){
    console.log('进入到accessToken中的返回函数');
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var token = opts.token;
    var str = [token, timestamp, nonce].sort().join('');
    console.log('打印str:' + str);
    // 2、进行加密
    var sha = sha1(str);

    if (this.method === 'GET') {
      // 验证微信token
      // 1、连接进行字典排序

      // 3、判断加密后的值是否等于 signature（签名）
      if (sha === signature) {
        // 4、如果相同，原封不动返回echostr
        this.body = echostr + '';
      }
      else {
        // 4、不同返回wrong
        this.body = 'wrong';
      }
    } else if (this.method === 'POST') {//用户发的消息
      if (sha !== signature) {
        // 4、如果相同，原封不动返回echostr
        this.body = echostr + '';
      } else {
        var data = yield getRowBody(this.req, {
          length: this.length,
          limit: '1mb',
          encoding: this.charset
        });

        var that = this;
        var content = yield util.parseXMLAsync(data);
        var message = util.formateMessage(content.xml);

        console.log(this.body);

        this.weixin = message;
        yield handler.call(this, next);
        
        wechat.reply.call(this);
      }
    }
  }
}

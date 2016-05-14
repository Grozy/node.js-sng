// 'use strict'

var sha1 = require('sha1')
var Wechat = require('./wechat');
var getRowBody = require('raw-body');
var util = require('./utils');
var news = require('../templates/news');

module.exports = function(opts, handler){
  var wechat = new Wechat(opts);
  // console.log(opts);
  return function *(next){
    // this.resolve(this.echostr);
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var token = opts.token;
    var str = [token, timestamp, nonce].sort().join('');
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

        this.weixin = message;
        yield handler.call(this, next);

        wechat.reply.call(this);
      }
    }
  }
}

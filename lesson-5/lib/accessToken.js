// 'use strict'

var sha1 = require('sha1')
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var prefix = 'https://api.weixin.qq.com/cgi-bin/';

var api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}

function Wechat(opts) {
  var that = this;
  this.appID = opts.appID;
  this.appSecret = opts.appSecret;
  this.getAccessToken = opts.getAccessToken;
  this.saveAccessToken = opts.saveAccessToken;
  this.getAccessToken()
    .then(function(data) {
      try {
        data = JSON.parse(data)
      } catch (e) {
        // 文件不存在 或者accesstoken不合法
        return that.updateAccessToken(data);
      }
      // 拿到了之后，进行合法性检查（是否过了有效期）
      if (that.isValidAccessToken(data)) {
        // 合法 将票据传递下去
        return that.goOn(data);
      } else {
        // 不合法 ，更新票据
        return that.updateAccessToken();
      }
    })
    .then(function(data){
      console.log('!!!!!!!!! ' + data);
      that.access_token = data.access_token;
      that.expires_in = data.expires_in;

      that.saveAccessToken(data);
    })
}

Wechat.prototype.goOn = function (data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
};

Wechat.prototype.isValidAccessToken = function (data) {
  if (!data || !data.access_token || !data.expires_in) {
    return false;
  }
  var access_token = data.access_token;
  var expires_in = data.expires_in;
  var now = (new Date().getTime());

  if (now < expires_in) {
    return true;
  } else {
    return false;
  }
};

Wechat.prototype.updateAccessToken = function () {
  var appID = this.appID;
  var appSecret = this.appSecret;
  var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
  return new Promise(function(resolve, reject) {
    request({url: url, json: true}).then(function(response){
      console.log(response.body);
      var data = response.body;
      var now = (new Date().getTime());
      var expires_in = now + (data.expires_in - 20) * 1000;
      data.expires_in = expires_in;

      console.log('request : ' + data);
      resolve(data);
    });
  });
};

module.exports = function(opts){
  var wechat = new Wechat(opts);

  return function *(next){
    console.log(this.query);
    // this.resolve(this.echostr);
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var token = opts.token;

    // 验证微信token
    // 1、连接进行字典排序
    var str = [token, timestamp, nonce].sort().join('');
    // 2、进行加密
    var sha = sha1(str);
    // 3、判断加密后的值是否等于 signature（签名）
    if (sha === signature) {
      // 4、如果相同，原封不动返回echostr
      this.body = echostr + '';
    }
    else {
      // 4、不同返回wrong
      this.body = 'wrong';
    }
  }
}

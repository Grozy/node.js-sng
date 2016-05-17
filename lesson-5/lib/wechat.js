'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var utils = require('./utils');
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var _ = require('lodash');
var fs = require('fs');

var api = {
  accessToken: prefix + 'token?grant_type=client_credential',
  temporary: {
    upload: prefix + 'media/upload?',
  },
  permanent: {
    upload: prefix + 'material/add_material?',
    uploadNews: prefix + 'material/add_news?',
    uploadNewsPic: prefix + 'media/uploadimg?',
  }
}

function Wechat(opts) {
  var that = this;
  this.appID = opts.appID;
  this.appSecret = opts.appSecret;
  this.getAccessToken = opts.getAccessToken;
  this.saveAccessToken = opts.saveAccessToken;
  this.fetchAccessToken();
}

Wechat.prototype.fetchAccessToken = function () {
  var that = this;
  if (this.access_token && this.expires_in) {
    if (this.isValidAccessToken(this)) {
      return Promise.resolve(this);
    }
  }
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
      that.access_token = data.access_token;
      that.expires_in = data.expires_in;

      that.saveAccessToken(data);
      return Promise.resolve(data);
    })
};

Wechat.prototype.goOn = function (data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
}

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
}

Wechat.prototype.updateAccessToken = function () {
  // console.log('__file__:' + wechat.js + '\n' + '__func__:updateAccessToken');
  var appID = this.appID;
  var appSecret = this.appSecret;
  var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
  return new Promise(function(resolve, reject) {
    request({url: url, json: true}).then(function(response){
      // console.log(response.body);
      var data = response.body;
      var now = (new Date().getTime());
      var expires_in = now + (data.expires_in - 20) * 1000;
      data.expires_in = expires_in;

      // console.log('request : ' + data);
      resolve(data);
    });
  });
};

Wechat.prototype.uploadMaterial = function(type, material, permanent) {
  var that = this;
  var form = {};
  var uploadUrl = api.temporary.upload;

  if (permanent) {
    uploadUrl = api.permanent.upload;

    _.extend(form, permanent);
  }

  if (type === 'pic') {
    uploadUrl = api.permanent.uploadNewsPic;
  }
  if (type === 'news') {
    uploadUrl = api.permanent.uploadNews;
    form = material;
  } else {
    form.media = fs.createReadStream(material);
  }

  return new Promise(function(resolve, reject) {

    that.fetchAccessToken()
    .then(function(data){
      var url = uploadUrl + '&access_token=' + data.access_token + '&type=' + type;
      if (!permanent) {
        url += '&type' + type;
      } else {
        form.access_token = data.access_token;
      }

      var options = {
        method: 'POST',
        url: url,
        json: true
      }

      if (type === 'news') {
        options.body = form;
      } else {
        options.formData = form;
      }
      console.log(' requst url : ' + url);

      request({method: 'POST', url: url, formData: form, json: true})
      .then(function(response){
        var _data = response.body;
        if (_data) {
          resolve(_data);
        } else {
          throw new Error('Upload material fails');
        }
      })
      .catch(function(err){
        reject(err);
      });
    });
  });
}


Wechat.prototype.reply = function(){
  var content = this.body;
  var message = this.weixin;
  var body = utils.tpl(content, message);
  var MsgType = message.MsgType;
  // console.log('log content :' + content);
  this.status = 200;
  this.type = 'application/xml';


  if (MsgType === 'event') {
    var event = message.Event;
    if ('unsubscribe' === event) {
      // that.body = body;
    } else if ('subscribe' === event) {

      var now = new Date().getTime();
      that.status = 200;
      that.type = 'application/xml';
      that.body = body;
       return;
    }
  } else if (MsgType === 'text') {
    this.body = body;
    return;
  }
}

module.exports = Wechat;

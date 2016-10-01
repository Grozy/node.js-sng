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
  },
  group: {
    create: prefix + '',
    get: prefix + '',
    check: prefix + '',
    update: prefix + '',
    move: prefix + '',
    batchupdate: prefix + '',
    batchdelete: prefix + ''
  },
  user: {

  },
  mass: {

  },
  menu: {
    create: prefix + 'menu/create?',
    get: prefix + 'menu/get?',
    del: prefix + 'menu/delete?',
    current: prefix + 'get_current_selfmenu_info?'
  }
}

function Wechat(opts) {
  console.log('初始化Wechat');
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
  return this.getAccessToken()
    .then(function(data) {
      try {
        console.log('获取data\n');
        data = JSON.parse(data)
      } catch (e) {
        // 文件不存在 或者accesstoken不合法
        return that.updateAccessToken(data);
      }
      console.log("检验token合理性\n");
      // 拿到了之后，进行合法性检查（是否过了有效期）
      if (that.isValidAccessToken(data)) {
        // 合法 将票据传递下去
        console.log("合理，传递下去\n");
        return that.goOn(data);
      } else {
        // 不合法 ，更新票据
        console.log("不合理，更新token\n");
        return that.updateAccessToken();
      }
    })
    .then(function(data){
      that.access_token = data.access_token;
      that.expires_in = data.expires_in;
      console.log("存储token\n");
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

  console.log('this :' + JSON.stringify(this));

  var that = this;
  var form = {};
  var uploadUrl = api.temporary.upload;

  if (permanent) {
    uploadUrl = api.permanent.upload;
    console.log('------------------------------------------------');
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
    console.log('打印 image data' + form.media);
  }

  return new Promise(function(resolve, reject) {

    that.fetchAccessToken()
    .then(function(data){
      var url = uploadUrl + '&access_token=' + data.access_token + '&type=' + type;
      if (!permanent) {
        url += '&type=' + type;
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
        console.log('打印 上传之后的data :' + JSON.stringify(_data));
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

// ---------------------------------- menu -------------------------------------
Wechat.prototype.createMenu = function(menu) {

  var that = this;

  return new Promise(function(resolve, reject) {

    that.fetchAccessToken()
    .then(function(data){
      var url = api.menu.create + '&access_token=' + data.access_token

      request({method: 'POST', url: url, body: menu, json: true})
      .then(function(response){
        var _data = response.body;
        console.log('打印 上传之后的data :' + JSON.stringify(_data));
        if (_data) {
          resolve(_data);
        } else {
          throw new Error('Create menu fails');
        }
      });
    });
  });
}

Wechat.prototype.getMenu = function() {

  var that = this;

  return new Promise(function(resolve, reject) {
    that.fetchAccessToken()
    .then(function(data){
      var url = api.menu.get + '&access_token=' + data.access_token

      request({method: 'POST', url: url, json: true})
      .then(function(response){
        var _data = response.body;
        console.log('打印 上传之后的data :' + JSON.stringify(_data));
        if (_data) {
          resolve(_data);
        } else {
          throw new Error('Get menu fails');
        }
      })
      .catch(function(err){
        reject(err);
      });
    });
  });
}

Wechat.prototype.deleteMenu = function() {
  var that = this;
  return new Promise(function(resolve, reject) {
    console.log('删除菜单 :' + JSON.stringify(that));
    that.fetchAccessToken()
    .then(function(data){
      var url = api.menu.del + '&access_token=' + data.access_token
      console.log('打印删除的url:' + url);
      request({url: url, json: true})
      .then(function(response){
        var _data = response.body;
        console.log('删除菜单menu的data:' + JSON.stringify(_data));
        if (_data) {
          resolve(_data);
        } else {
          throw new Error('Delete menu fails');
        }
      })
      .catch(function(err){
        reject(err);
      });
    })
  });
}

// ------------------------- 回复 ----------------------------------------------

Wechat.prototype.reply = function(){
  console.log('replay body info :' + this.body + '\n');
  var content = this.body;
  var message = this.weixin;
  var body = utils.tpl(content, message);
  var MsgType = message.MsgType;
  var eventKey = message.EventKey;
  // console.log('log content :' + content);
  this.status = 200;
  this.type = 'application/xml';

  console.log('message info :' + JSON.stringify(message));
  console.log('message is:' + MsgType);
  if (MsgType === 'event') {
    var event = message.Event;
    console.log('eventType is:' + event);
    if ('unsubscribe' === event) {
      // that.body = body;
    } else if ('subscribe' === event) {

      var now = new Date().getTime();
      that.status = 200;
      that.type = 'application/xml';
      that.body = body;
       return;
    } else if ('CLICK' === event) {
      // if ('contact_us' === eventKey || 'help_address' === eventKey || 'about_us' === eventKey) {
        console.log('回复信息:' + body);
        that.body = body;
        return;
      // }
    }
  } else if (MsgType === 'image') {
    this.body = body;
    return;
  } else if (MsgType === 'text') {
    this.body = body;
    return;
  }
}



module.exports = Wechat;

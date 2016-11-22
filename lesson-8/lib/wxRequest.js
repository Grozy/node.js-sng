'use strict'
const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const config = require('../conf/app_config');
const token = fs.readFileSync('./token_str').toString();
const prefix = 'https://api.weixin.qq.com/cgi-bin/';
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
    create: prefix + 'groups/create?',
    get: prefix + 'groups/get?',
    check: prefix + '',
    update: prefix + '',
    move: prefix + '',
    batchupdate: prefix + '',
    batchdelete: prefix + ''
  },
  user: {
    get: prefix + 'user/get?',
    getInfo: prefix + 'user/info?'
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

exports.getMemberList = function () {
  let queryParams = {
    access_token: token
  }
  let userGetBaseUrl = api.user.get + qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: userGetBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (body) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
};

exports.getMemberInfo = function (openid) {
  let queryParams = {
    access_token: token,
    openid: openid
  }
  let userGetBaseUrl = api.user.getInfo + qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: userGetBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (body) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  });
};

exports.groupCreate = function (name) {
  return new Promise((resolve, reject) => {
    let groupCreate = api.group.create + "access_token=" + token;
    let postParams = {
      group:{
        name: name
      }
    }
    const options = {
      url: groupCreate,
      form: JSON.stringify(postParams),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    console.log(name + "'s group is waiting for create");
    request.post(options, function(err, res, body){
      if (res.statusCode == 200) {
        resolve(JSON.parse(body))
      } else {
        reject(err);
      }
    });
  });
};

exports.queryGroupList = function () {
  // body...
  let queryParams = {
    access_token: token
  }
  let groupGetBaseUrl = api.group.get + qs.stringify(queryParams);
  let options = {
    method: 'GET',
    url: groupGetBaseUrl
  };
  console.log(options.method + ':url => ' + options.url);
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (res.statusCode == 200) {
        resolve(JSON.parse(body))
      } else {
        reject(err);
      }
    });
  });
};

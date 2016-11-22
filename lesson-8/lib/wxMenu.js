'use strict'
const fs = require('fs');
const request = require('request');

const token = fs.readFileSync('./token_str').toString();

var menus = {
  "button": [
  {
    "name": "测试菜单",
    "sub_button": [
      {
        "type": "view",
        "name": "授权登录",
        "url": "http://qy16009187.iask.in/auth"
      }
    ]
  }]
}

function createMenu() {
  let options = {
    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
    form: JSON.stringify(menus),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  console.log(JSON.stringify(options));
  request.post(options, function (err, res, body) {
    if (err) {
      console.log(err)
    }else {
      console.log(body);
    }
  });
}

module.exports = createMenu;

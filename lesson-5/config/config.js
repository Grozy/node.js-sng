'use strict'

var path = require('path');
var util = require('../lib/utils');
var wechat_file = path.join(__dirname, './wechat_file.txt');
var counter_file = path.join(__dirname, './counter_file.txt');

var config = {
  wechat: {
    appID: 'wxb81c19bfba960280',//app id
    appSecret: 'd4624c36b6795d1d99dcf0547af5443d', //app secret
    token: 'sng_sc_1991', // app token
    getAccessToken: function(data){
      return util.readFileAsync(wechat_file, 'utf-8');
    },
    saveAccessToken: function(data){
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_file, data);
    }
  },
  port: 8080
}

module.exports = config;

'use strict'

var koa = require('koa');
var util = require('./lib/utils');
var accessToken = require('./lib/accessToken');
var counter = require('./lib/counter');
var path = require('path');
var wechat_file = path.join(__dirname, './config/wechat_file.txt');
var counter_file = path.join(__dirname, './config/counter_file.txt');

var app = new koa();
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

app.use(counter(counter_file));
app.use(accessToken(config.wechat));

app.listen(config.port);
console.log('start listen port: ' + config.port);

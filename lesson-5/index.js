'use strict'

var koa = require('koa');
var util = require('./lib/utils');
var accessToken = require('./lib/accessToken');
var counter = require('./lib/counter');
var path = require('path');
var wechat_file = path.join(__dirname, './config/wechat_file.txt');
var counter_file = path.join(__dirname, './config/counter_file.txt');
var config = require('./config/config.js');
var weixin = require('./weixin');
var app = new koa();

app.use(counter(counter_file));
console.log("===启动===\n");
app.use(accessToken(config.wechat, weixin.replay));

app.listen(config.port);
console.log('start listen port: ' + config.port);

'use strict'

var fs = require('fs');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var news = require('../templates/news');

exports.readFileAsync = function(fpath, encoding){
  return new Promise(function(resolve, reject) {
    fs.readFile(fpath, encoding, function(err, content){
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

exports.writeFileAsync = function(fpath, content){
  return new Promise(function(resolve, reject) {
    fs.writeFile(fpath, content, function(err){
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

exports.parseXMLAsync = function(xml){
  return new Promise(function(resolve, reject) {
    xml2js.parseString(xml, {trim: true}, function(err, content){
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

function formateMessage(result) {
  var message = {};

  if (typeof result === 'object') {
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var item = result[key];
      if (!(item instanceof Array) || item.length === 0) {//如果不是数组
        continue;
      }

      if (item.length === 1) {
        var val = item[0];
        // console.log(val);
        if (typeof val === 'object') {
          message[key] = formateMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        for (var j = 0,k = item.length; j < k; j++) {
          message[key].push(formateMessage(item[j]));
        }
      }
    }
  }
  return message;
}

exports.formateMessage = formateMessage;

exports.tpl = function(content, message) {
  var info = {};
  var type = 'text';
  var fromUser = message.FromUserName;
  var ToUserName = message.ToUserName;

  if (Array.isArray(content)) {
    type = 'news'
  }
  if (content) { //取消关注的时，Content为undefined
    type = content.type || type;
  }
  console.log('utils.log message : ' + JSON.stringify(message));

  info.content = content;
  info.createtime = new Date().getTime();
  info.ToUserName = fromUser;
  info.FromUserName = ToUserName;
  info.MsgType = type;
  return news.compiled(info);
}

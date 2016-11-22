const crypto = require('crypto');
const path = require('path');
const url = require('url');

const config = require('../conf/app_config');

//进行sha加密
function sha1(str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

function wechatAuth(req, res){
  var query = url.parse(req.url, true).query;
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;

  var arr = [nonce, timestamp, config.token];

  //数组进行字典排序
  arr.sort();
  var sortStr = arr.join('');
  var sha1Str = sha1(sortStr);

  if (signature === sha1Str) {
    res.end(echostr);
  } else {
    res.end("false");
    console.log("授权失败!");
  }
}

module.exports = wechatAuth;

'use strict'
var router = require('express').Router();
var config = require('../conf/app_config');
var qs = require('querystring');
const request = require('request');
const wxRequest = require('../lib/wxRequest');
var User = require('../model/user');

router.get('/', function(req, res) {
  console.log('123');
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
  const baseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";
  let queryParams = {
    appid: config.appId,
    redirect_uri: "http://qy16009187.iask.in/auth/get_wx_access_token",
    response_type: "code",
    scope:"snsapi_userinfo",
    state :"1"
  }
  var authUrl = baseUrl + qs.stringify(queryParams);
  console.log('redirect url:' + authUrl);
  res.redirect(authUrl);
});

router.get('/get_wx_access_token', function(req,res, next){
    //console.log("get_wx_access_token")
    //console.log("code_return: "+req.query.code)

    // 第二步：通过code换取网页授权access_token
    console.log(req.query);
    var code = req.query.code;
//     获取code后，请求以下链接获取access_token：
// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
  let queryParams = {
    appid: config.appId,
    secret: config.appSecret,
    code: code,
    grant_type: "authorization_code"
  }
  const baseTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?";
  const tokenUrl = baseTokenUrl + qs.stringify(queryParams);
  var options = {
    method: 'GET',
    url: tokenUrl
  };
  var thatRes = res;
  request(options, function(err, res, body){
    console.log("1234: " + body);
    if (res.statusCode == 200) {
      var data = JSON.parse(body);
      if (data.openid) {
        var token = data.access_token;
        var openid = data.openid;

        req.session.token = token;
        req.session.openid = openid;
        wxRequest.getMemberInfo(openid).then(res => {
          console.log('123' + JSON.stringify(res));
          var user = new User(res);
          user.save();
        });
      }

      thatRes.redirect('/');
    }
  });
});

module.exports = router;

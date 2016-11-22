var express = require('express');
var router = express.Router();
const request = require('request');
const wxRequest = require('../lib/wxRequest');
const Commodity = require('../model/commodity');

router.get('/', function(req, res){

  // res.render('login', {
  //   title: '登录',
  //   user: req.session.user,
  //   success: req.flash('success').toString(),
  //   error: req.flash('error').toString()
  // });
  if (req.query.ljm) {
    console.log('search :' + req.query.ljm);
    Commodity.queryWithLJM(req.query.ljm, function(err, commoditys){
      console.log("commoditys123:" + JSON.stringify(commoditys));
      req.flash('commoditys', commoditys);
      res.redirect('/');
      // res.render('index', { title: '神驰查价系统', commoditys: req.flash('success') });
    });
  } else {
    res.render('index', { title: '神驰查价系统', commoditys: req.flash('commoditys') });
  }

});

router.get('/userinfo', function(req, res){
  var token = req.session.token;
  var openid = req.session.token;
  console.log('log session :' + JSON.stringify(req.session));
  var thatRes = res;
  request.get({url: "https://api.weixin.qq.com/sns/userinfo?access_token=" + token + "&openid=" + openid + "&lang=zh_CN"}, function(req, res, body) {
    if (res.statusCode == 200) {
      console.log('user info :' + body);
      var user = JSON.parse(body);
      thatRes.render("info", user);
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 登录
  params:{
    account: 用户名
    password: 密码
  }
  response:{
    data:{
      uid: 用户id
      name: 用户名
    }
    status:0
  }
*/
router.post('/login', function(req, res, next) {
  // res.send('登录');
  var account = req.body.account;
  User.getWithAccount(account ,function(err, result){
    console.log("query result" + result);
    var response = {}
    if (result != null && (result.password == req.body.password)) {
      response['status'] = "200"
      var data = {
        uid: result.uid,
        name: result.name
      }
      response['data'] = data
    } else {
      response['status'] = "404"
    }
    res.jsonp(response);
  });
});

/* 修改密码
  password:{
    password: 新密码
    password_re: 重复新密码
  }
  response:{
    data:
    status:0
  }
*/
router.post('/changePassword', function(req, res, next) {
  res.send('修改密码');
});

module.exports = router;

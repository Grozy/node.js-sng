var express = require('express');
var User = require('../models/user');
var Commodity = require('../models/commodity');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadFile', function(req, res, next) {
  res.send('!!!...上传文件...!!!');
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录'
  });
});

router.get('/main', checkLogin);
router.get('/main', function(req, res, next) {
  res.render('main', {
    title: '管理页',
    user: req.session.user,
  })
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res, next) {
  console.log(req.body);
  var body = req.body,
  user = {
    account: req.body.account,
    password: req.body.password
  }
  User.getAdminAccount(user.account, function(user, err){
    var user = new User(user.uid, user.name, user.account, user.password);
    if (user) {
      req.session.user = user;
      res.redirect('/main');
    }
  });
});

router.get('/error-position', function(req, res, next) {
  var deal = req.query.deal;
  console.log(req.query);
  if (deal == null) {
    Commodity.query_postion_report(function(err, result){
      res.render('error-position', {
        title: '仓位异常上报',
        reports: result
      });
    });
  } else {
    console.log("修改状态");
    Commodity.dealWithReport(deal, function(err, result) {
      console.log('修改成功');
      res.redirect('/error-position')
    });
  }
});

router.get('/member-manager', function(req, res, next) {
  User.getUsers(function(err, users) {
    res.render('member-manager', {
      title: '人员管理',
      users: users,
    });
  });
});

router.post('/member-manager', function(req, res, next) {

  var user = new User();
  user.name = req.body.name;
  user.password = req.body.password,
  user.account = req.body.account,
  user.save(function(err, result) {
    if (err) {
      console.log('/member-manager ' + err);
    } else {
      res.redirect('/member-manager');
    }
  });
});

router.get('/documents-manager', function(req, res, next) {
  res.render('documents-manager', {
    title: '取货单管理'
  });
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    res.redirect('back');
  }
  next();
}

module.exports = router;

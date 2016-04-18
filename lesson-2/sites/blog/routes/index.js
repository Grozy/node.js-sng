var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = req.session.user;
  user_id = null;
  if (currentUser) {
    user_id = currentUser.id;
  }
  Post.get(user_id, function(err, posts){
    if (err) {
      posts = [];
    }
    for(i in posts[0]) {
      console.log(i);
    }
    console.log('log posts : ' + posts[0]);
    res.render('index', {
      title: '主页',
      user: req.session.user,
      posts: posts,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
  // 生成密码的md5值
  var md5 = crypto.createHash('md5'),
  password = md5.update(req.body.password).digest('hex')
  User.get(req.body.name, function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在!');
      return res.redirect('/login');//用户不存在则跳转到登录页
    }
    console.log(user[0]);
    var logined_user = user[0];
    req.session.user = logined_user;
    req.flash('success', '登陆成功！');
    res.redirect('/');//密码错误则跳转首页
  });
});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res, next) {
  res.render('reg', {
    title: '注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功！');
  res.redirect('/');//登出成功后跳转到主页
});

router.get('/upload', checkLogin);
router.get('/upload', function(req, res) {
  res.render('upload', {
    title: '文件上传',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.get('/post', checkLogin);
router.get('/post', function(req, res) {
  res.render('post', {
    title: '发表',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res) {
  var name = req.body.name,
  password = req.body.password,
  password_re = req.body['password-repeat'];
  if (password != password_re) {
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('/reg');//返回注册页
  }

  var md5 = crypto.createHash('md5'),
  password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    name: name,
    password: password,
    email: req.body.email
  });

  User.get(newUser.name, function(err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user.length !== 0) {
      // req.flash('error','用户已存在!');
      return res.redirect('/reg');//返回注册页
    }
    console.log('excuse save ' + user);
    newUser.save(function(err, user) {
      if (err) {
        // req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = user;//将用户信息存入session
      req.flash('success', '注册成功!');
      res.redirect('/'); //注册成功后返回主页
    });
  });
});

router.post('/post', checkLogin);
router.post('/post', function(req, res) {
  var currentUser = req.session.user,
  post = new Post(currentUser.id, req.body.title, req.body.post);
  console.log('post ' + req.body.post);
  console.log('user ' + currentUser.user_id + '- post' + post);
  post.save(function(err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '发布成功');
    res.redirect('/');//发布成功后跳转到主页
  });
});

router.post('/upload', checkLogin);
router.post('/upload', function(req, res) {
  req.flash('success', '文件上传成功');
  res.redirect('/upload');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录！');
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录！');
    res.redirect('back');//返回之前的页面
  }
  next();
}

module.exports = router;

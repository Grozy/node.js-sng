var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var topics = require('./routes/topic');
var wechat_router = require('./routes/wechat')
var wechat = require('wechat');
var http = require('http');
var querystring = require('querystring');
var app = express();

var $settings = require('./conf/settings')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//  flash
app.use(flash());
app.use(multer({
  dest: './public/tmp/images',
  rename: function(fieldname, filename) {
    return filename;
  }
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: $settings.cookieSecret,
  name: $settings.cookieName, //这里的name是cookie的name，默认cookie的name是：connect.solid
  cookie: $settings.cookie, //设置maxAge是80000ms，即80s后session和响应的cookie失效过期
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/topic', topics);
app.use('/wechat', wechat_router);

app.use(function(req, res, next) {
  var options = {
    host: 'https://api.weixin.qq.com/',
    port: 80,
    path: 'cgi-bin/menu/create?access_token=sng_sc_1991',
    method: 'POST'
  };
  var post_data = querystring.stringify({
    button: [
      {
        name: "扫码"
      }
    ]
  });

  var req = http.request(options, function(res){
    console.log('!!!!!request!!!!');
  })
  req.write(post_data);
  req.end();
  next(err);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var koa = require('koa');
var sha1 = require('sha1')

var app = new koa();
var config = {
  wechat: {
    appID: 'wxb81c19bfba960280',
    appSecret: 'd4624c36b6795d1d99dcf0547af5443d',
    token: 'sng_sc_1991',
  }
}

app.use(function *(){
  console.log(this.query);
  // this.resolve(this.echostr);
  var signature = this.query.signature;
  var echostr = this.query.echostr;
  var timestamp = this.query.timestamp;
  var nonce = this.query.nonce;
  var token = config.wechat.token;

  // 验证微信token
  // 1、连接进行字典排序
  var str = [token, timestamp, nonce].sort().join('');
  // 2、进行加密
  var sha = sha1(str);
  // 3、判断加密后的值是否等于 signature（签名）
  if (sha === signature) {
    // 4、如果相同，原封不动返回echostr
    this.body = echostr + '';
  }
  else {
    // 4、不同返回wrong
    this.body = 'wrong';
  }
});

app.listen(8080);

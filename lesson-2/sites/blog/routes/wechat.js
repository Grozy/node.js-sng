var express = require('express');
var wechat = require('wechat');
var router = express.Router();
/* GET users listing. */
router.use('/', wechat('sng_sc_1991', function(req, res, next) {
  var message = req.weixin;
  console.log(message);
  if (message.MsgType == 'text') {
    res.reply('别发字符串！！');
  } else if (message.MsgType == 'image') {
    res.reply('图片也是一样的！！');
  }
}));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

var express = require('express');
var wechat = require('wechat');
var router = express.Router();
/* GET users listing. */
router.use('/', wechat('sng_sc_1991', function(req, res, next) {
  var message = req.weixin;
  console.log(message);
}));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

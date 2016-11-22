const router = require('express').Router();
const wxAuth = require('../lib/wxAuth');
const _ = require('../lib/utils');
const autoReply = require('../lib/autoReply');
router.get('/', wxAuth);

router.post('/', function(req, res){
  // console.log(req.body);
  res.writeHead(200, {'Content-Type': 'application/xml'});
  //关注后回复
  if (req.body.xml.event === 'subscribe') {
    var resMsg = autoReply('text', req.body.xml, '欢迎关注');
    res.end(resMsg);
  } else {
    const message = req.body.xml;
    console.log(req.body);
    res.end(autoReply(message));
  }
});

module.exports = router;

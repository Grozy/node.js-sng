var express = require('express');
var wechat = require('wechat');
var router = express.Router();
/* GET users listing. */

// { ToUserName: 'gh_4550b3840c35',
//   FromUserName: 'oapcZw9zx_4U1_0gEyXhChoPfnKU',
//   CreateTime: '1462862078',
//   MsgType: 'event',
//   Event: 'subscribe',
//   EventKey: '' }

router.use('/', wechat('sng_sc_1991', function(req, res, next) {
  var message = req.weixin;
  console.log(message);
  if (message.MsgType == 'text') {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧!',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://172.31.242.3/images/game.jpg',
        url: 'http://www.baidu.com/'
      },
      {
        // u=3961844352,1146097257&fm=21&gp=0.jpg
        title: '你来我家接我吧!',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://172.31.242.3/images/game2.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  } else if (message.MsgType == 'image') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else if (message.MsgType == 'event' || message.Event == 'subscribe') {

    var refillStr = "<a href=\"http://172.31.242.3\">1. 点击记录团队充值</a>"

    var consumeStr = "<a href=\"http://your_IP/weixin/consume?weixinId=" + message.FromUserName + "\">2. 点击记录团队消费</a>"
    var deleteStr = "<a href=\"http://your_IP/weixin/delete?weixinId=" + message.FromUserName + "\">3. 点击回退记录</a>"
    var historyStr = "<a href=\"http://your_IP/weixin/history?weixinId=" + message.FromUserName + "\">4. 点击查询历史记录</a>"

    var emptyStr = "          ";
    var replyStr = "感谢你的关注！" + "\n"+ emptyStr + "\n" + refillStr + "\n"+ emptyStr + "\n" + consumeStr
            + "\n"+ emptyStr + "\n" + deleteStr + "\n"+ emptyStr + "\n" + historyStr;
    res.reply(replyStr);

    // res.reply('谢谢关注' + message.FromUserName);
  }
}));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

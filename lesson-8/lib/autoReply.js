const _ = require('../lib/utils');

function autoReply(message){
  var content = {};
  console.log(JSON.stringify(message));
  if (message.msgtype === 'text') {
    if (message.content === '授权') {
      content = "&lta href=\"http://www.baidu.com\"" + "&gt授权&lt/a&gt";
    } else {
      content = '文字';
    }
  } else if(message.msgtype === 'image') {
    var content = "图片";
    body = _.tpl(content, message);
  } else {
    var content = "other";

  }
  var xml = _.tpl(content, message);
  console.log(xml);
  return xml;
}

module.exports = autoReply;

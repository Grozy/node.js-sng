var news = require('../templates/news');

function formateMessage(result) {
  var message = {};
  if (typeof result === 'object') {
    console.log('object ' + JSON.stringify(result));
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var item = result[key];
      if (!(item instanceof Array) || item.length === 0) {//如果不是数组
        continue;
      }

      if (item.length === 1) {
        var val = item[0];
        // console.log(val);
        if (typeof val === 'object') {
          message[key] = formateMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        for (var j = 0,k = item.length; j < k; j++) {
          message[key].push(formateMessage(item[j]));
        }
      }
    }
  }
  console.log('keys ' + JSON.stringify(message));
  return message;
}

exports.formateMessage = formateMessage;

exports.tpl = function (content, message) {
  // body...
  var info = {};
  var type = 'text';
  var fromUserName = message.fromusername;
  var toUserName = message.tousername;

  if (Array.isArray(content)) {
    type = 'news'
  }
  if (content) { //取消关注的时，Content为undefined
    type = content.type || type;
  }
  console.log('utils.log message : ' + JSON.stringify(message) + '\nfromeUser:' + fromUserName + '\ntoUser:' + toUserName);

  info.content = content;
  info.createtime = new Date().getTime();
  info.ToUserName = fromUserName;
  info.FromUserName = toUserName;
  info.MsgType = type;
  return news.compiled(info);
};

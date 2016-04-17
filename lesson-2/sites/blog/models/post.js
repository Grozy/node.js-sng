var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../dao/postSqlMapping');

var pool = mysql.createPool($conf.mysql);

function Post(user_id, title, post) {
  this.user_id = user_id;
  this.title = title;
  this.post = post;
}

module.exports = Post;

Post.prototype.save = function(callback) {
  console.log('response');
  var date = new Date();
  //存储各种时间格式，方便今后拓展
  var year = date.getFullYear(),
  month = date.getMonth() + 1;
  day = date.getDate(),
  minute = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var time = {
    date: date,
    year: year,
    month: year + "-" + month,
    day: year + "-" + month + "-" + day,
    minute: year + "-" + month + "-" + day + " " + minute
  }
// 要存入数据库的文档
  var post = {
    user_id: this.user_id,
    time: time,
    title: this.title,
    post: this.post,
  };
  console.log('the post ' + post +' will insert table');

  pool.getConnection(function(err, connection) {
    console.log('open post table err:' + err);
    if (err) {
      return callback(err);
    }
    // 'INSERT INTO post(id, user_id, title, content, time_stamp) VALUE(0,?,?,?,?)'
    connection.query(sql.insert, [post.user_id, post.title, post.post, time.minute], function(err, result) {
      console.log('log insert post err:' + err);
      if (result) {
        callback(null, result);
      }
      connection.release();
    });
  });
};

Post.prototype.get = function (id, callback) {

};

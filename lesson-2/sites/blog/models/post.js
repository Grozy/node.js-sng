var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../dao/postSqlMapping');

var markdown = require('markdown').markdown;
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
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    // 'INSERT INTO post(id, user_id, title, content, time_stamp) VALUE(0,?,?,?,?)'
    connection.query(sql.insert, [post.user_id, post.title, post.post, time.minute], function(err, result) {
      if (result) {
        console.log(result);
        callback(null, result);
      }
      connection.release();
    });
  });
};

Post.getAll = function (callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.queryAll, [], function(err, result) {
      if (err) {
        return callback(err);//失败返回err
      }
      result.forEach(function(post){
        post.post = markdown.toHTML(post.post)
      });
      callback(null, result);//成功，以数组形式返回
      connection.release();
    });
  });
};

Post.getOne = function(topic_id, user_id, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.queryByTopicIdBelongToUserId, [user_id, topic_id], function(err, result) {
      if (err) {
        return callback(err);
      }
      result.forEach(function(post){
        post.post = markdown.toHTML(post.post)
      });
      callback(null, result);
      connection.release();
    });
  });
}

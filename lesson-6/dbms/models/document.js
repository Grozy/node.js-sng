var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/usersql');

var pool = mysql.createPool($conf.mysql);

function Document(uid, time_stamp, count, goods) {
  this.uid = uid;
  this.time_stamp = time_stamp;
  this.count = count;
  this.goods = goods;
}

module.exports = Document;

Document.getAll = function(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query()
  });
}

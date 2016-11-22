var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/usersql');

var pool = mysql.createPool($conf.mysql);

function User(uid, name, account, password) {
  this.uid = uid;
  this.name = name;
  this.account = account;
  this.password = password;
}

module.exports = User;

User.prototype.save = function (callback) {
  console.log(this.account);
  var that = this;
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.insert.user, {account: that.account, password: that.password, name: that.name}, function(err, result) {
      connection.release();
      console.log(result);
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  });
};

User.getWithAccount = function(account, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    // 获取仓位的时候先从commodityinfo表中查询仓位信息，如果info表中没有，直接使用电脑的数据库结果
    console.log('query with id:' + account);
    connection.query(sql.query.userByAccount, [account], function(err, result) {
      if (err) {
        callback(err);
        connection.release();
      } else {
        var user = result.length > 0? result[0]: null;
        if (user) {
          console.log('query with result name:' + user.name);
        }
        connection.release();
        callback(null, user);
      }
    });
  });
}

User.getUsers = function(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.query.users, [], function(err, result) {
      connection.release();
      if (err) {
        callback(err);
      } else {
        console.log(result);
        var users = [];
        for (var i = 0; i < result.length; i++) {
          var user_in_result = result[i],
          user = new User(user_in_result.uid, user_in_result.name, user_in_result.account, user_in_result.password);
          users.push(user);
        }
        callback(null, users);
      }
    });
  });
}

User.getAdminAccount = function(account, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    console.log('query with id:' + account);
    connection.query(sql.query.adminByAccount, [account], function(err, result) {
      if (err) {
        return callback(err);
      } else {
        var user = result.length > 0? result[0]: null;
        console.log('query with result name:' + user.name);
        connection.release();
        callback(user);
      }
    });
  });
}

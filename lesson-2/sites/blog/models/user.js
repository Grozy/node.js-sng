var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../dao/userSqlMapping');

var pool = mysql.createPool($conf.mysql);

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

module.exports = User;

User.prototype.save = function (callback) {
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  console.log('do something '+ user);
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.insert, [user.name, user.password, user.email], function(err, result){
      if (result) {
        callback(null, user);
      }
      connection.release();
    });
  });
};

User.get = function(name, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.queryByName, [name], function(err, result) {
      if (result) {
        callback(null, result);
      } else {
        callback(null, null);
      }
      connection.release();
    });
  });
};

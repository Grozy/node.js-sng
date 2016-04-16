var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('./userSqlMapping');

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  database: 'pet',
  password: '123456',
  queueLimit: 8
});

var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg:  '操作失败'
    });
  } else {
    res.json(ret);
  }

}

module.exports = {
  add: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.param;
      connection.query($sql.insert, [param.name, param.age], function(err, result){
        if (result) {
          result = {
            code: 200,
            msg: '增加成功'
          };
          jsonWrite(res, result);
          connection.release();
        }
      });
    });
  }
}

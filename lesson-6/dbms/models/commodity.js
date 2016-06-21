var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/commoditySql');

var pool = mysql.createPool($conf.mysql);

function Commodity(no, location, pics) {
  console.log('constructor: ' + no + ' ' + location + ' ' + pics);
  this.no = no;
  this.location = location
  this.pics = pics
}

module.exports = Commodity;

Commodity.prototype.save = function(callback) {
  console.log('response');
//   var date = new Date();
//   //存储各种时间格式，方便今后拓展
//   var year = date.getFullYear(),
//   month = date.getMonth() + 1;
//   day = date.getDate(),
//   minute = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
//   var time = {
//     date: date,
//     year: year,
//     month: year + "-" + month,
//     day: year + "-" + month + "-" + day,
//     minute: year + "-" + month + "-" + day + " " + minute
//   }
// // 要存入数据库的文档
//   var post = {
//     user_id: this.user_id,
//     time: time,
//     title: this.title,
//     post: this.post,
//   };
  // pool.getConnection(function(err, connection) {
  //   if (err) {
  //     return callback(err);
  //   }
  //   // 'INSERT INTO post(id, user_id, title, content, time_stamp) VALUE(0,?,?,?,?)'
  //   connection.query(sql.insert, [post.user_id, post.title, post.post, time.minute], function(err, result) {
  //     if (result) {
  //       console.log(result);
  //       callback(null, result);
  //     }
  //     connection.release();
  //   });
  // });
};

Commodity.getAll = function (callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    connection.query(sql.query.commoditys, [], function(err, result) {
      if (err) {
        console.log('error: ' + err);
        return callback(err);//失败返回err
      }
      callback(null, result);//成功，以数组形式返回
      connection.release();
    });
  });
};

Commodity.getOne = function(commodity_id, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    // 获取仓位的时候先从commodityinfo表中查询仓位信息，如果info表中没有，直接使用电脑的数据库结果
    console.log('query with id:' + commodity_id);
    connection.query(sql.query.commodityById, [commodity_id], function(err, result) {
      if (err) {
        callback(err);
        connection.release();
      } else {
        var commodity = result.length > 0? result[0]: null;
        console.log('query with result id:' + commodity_id);
        Commodity.getInfo(commodity_id, function(err, result) {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            // 如果result.length
            var commodityinfo = result;
            if (commodityinfo) {
              commodity.CW = commodityinfo.location
            }
            callback(null, commodity);
          }
        });
        connection.release();
      }
    });
  });
}

Commodity.getInfo = function(commodity_id, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    console.log('gerInfo -> query with id : ' + commodity_id);
    connection.query(sql.query.commodityInfoById, [commodity_id], function(err, result) {
      if (err) {
        callback(err)
      }
      // 如果result.length
      callback(null, result.length > 0? result[0]: null);
      connection.release();
    })
  })
}

Commodity.prototype.updateInfo = function(callback) {
  console.log('FUNCTION:\nfunction: updateInfo\n' + 'no:' + this.no + '\npics:' + this.pics + '\nlocation:' + this.location);
  var that = this
  Commodity.getInfo(this.no, function(err, commodityInfo) {
    pool.getConnection(function(err, connection) {
      if (err) {
        callback(err);
      }
      if (commodityInfo == null) {
        console.log('insert ...');
        var params = {}
        if (that.no) {
          params['XH'] = that.no;
        }
        if (that.pics) {
          params['pics'] = that.pics.join(",");
        }
        if (that.location) {
          params['location'] = that.location;
        }
        // commodityInfo: 'insert into commodity_info (pics, XH, location, no) values ( ?, ?, ?, ?)'
        connection.query(sql.insert.commodityInfo, params, function(err, result) {
          if (err) {
            console.log('insert err ' + err);
            callback(err, null)
            return
          }
          callback(null, result)
        })
      } else {
        console.log('query with commodityInfo: ' + commodityInfo + '\n no:' + that.no + '\nlocation:' + that.location);
        // UPDATE commodity_info SET location=? WHERE XH=?',
        connection.query(sql.update.commodityInfo.location, [that.location,that.no], function(err, result) {
          console.log('update err: ' + err);
          if (err) {
            return callback(err);
          }
          return callback(null, result)
        })
      }
      connection.release();
    })

  })
}

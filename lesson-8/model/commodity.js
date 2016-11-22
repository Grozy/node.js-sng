var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/commoditySql');

var pool = mysql.createPool($conf.mysql);

function Commodity(no, location, pics, pinyin) {
  console.log('constructor: ' + no + ' ' + location + ' ' + pics);
  this.no = no;
  this.location = location;
  this.pics = pics;
  this.pinyin = pinyin;
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
        return callback(err);
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
      }
      connection.release();
    });
  });
}

Commodity.getInfo = function(commodity_id, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }

    connection.query(sql.query.commodityInfoById, [commodity_id], function(err, result) {
      if (err) {
        callback(err)
      }
      // 如果result.length
      console.log('gerInfo -> query with id : ' + commodity_id + ' result is :' + result.LJM);
      callback(null, result.length > 0? result[0]: null);
      connection.release();
    })
  })
}

Commodity.query_postion_report = function(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      return callback(err);
    } else {
      connection.query(sql.query.commodityReportInfo, null, function(err, result) {
        callback(null, result);
        connection.release();
      });
    }
  });
}

Commodity.dealWithReport = function(commodity_id, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      return callback(err);
    } else {
      console.log('update commo');
      connection.query(sql.update.commodityInfo.report, [1, commodity_id], function(err, result) {
        if (err) {
          console.log(err);
          return callback(err, null)
        } else {
          callback(null, result);
        }
        connection.release();
      });
    }
  });
}

Commodity.prototype.position_report = function(uid ,callback) {
  console.log('FUNCTION:\nfunction: updateInfo\n' + 'no:' + this.no + '\nuid:' + uid + '\nlocation:' + this.location);
  var that = this
  pool.getConnection(function(err, connection) {
    console.log('insert ...' + that.no);
    if (err) {
      console.log(err);
      return callback(err);
    }
    if (that.no) {
      var params = {}
      if (that.no) {
        params['good_id'] = that.no;
      }
      if (uid) {
        params['uid'] = uid;
      }
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
      params['time_stamp'] = time.minute
      if (that.location) {
        params['location'] = that.location;
      }
      // commodityInfo: 'insert into commodity_info (pics, XH, location, no) values ( ?, ?, ?, ?)'
      console.log('prepare insert data into database');
      connection.query(sql.insert.commodityNewPosition, params, function(err, result) {
        if (err) {
          console.log('insert new report err:' + err);
          return callback(err, null);
        }
      });
      that.updateInfo(callback);
      connection.release();
    }
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
            connection.release();
            return callback(err, null)

          }
          callback(null, result)
          connection.release();
        })
      } else {
        // UPDATE commodity_info SET location=? WHERE XH=?',
        connection.query(sql.update.commodityInfo.location, [that.location,that.no], function(err, result) {
          console.log('update err: ' + err);
          if (err) {
            connection.release();
            return callback(err);
          }
          callback(null, result)
          connection.release();
        })
      }
    })

  })
}

Commodity.queryWithLJM = function(ljm, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      return callback(err);
    }
    // 获取仓位的时候先从commodityinfo表中查询仓位信息，如果info表中没有，直接使用电脑的数据库结果
    connection.query("SELECT * FROM KC WHERE PYDM like '%" + ljm + "%'", function(err, result) {
      if (err) {
        return callback(err);
      } else {
        console.log("search result:" + result);
        callback(null, result);
      }
      connection.release();
    });
  });
}

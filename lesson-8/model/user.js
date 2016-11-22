var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/userSql');
var wxRequest = require('../lib/wxRequest');
var pool = mysql.createPool($conf.mysql);

function User(params) {
  this.openid = params.openid;
  this.subscribe = params.subscribe;
  this.nickname = params.nickname;
  this.sex = params.sex;
  this.language = params.language;
  this.city = params.city;
  this.province = params.province;
  this.country = params.country;
  this.headimgurl = params.headimgurl;
  this.subscribe_time = params.subscribe_time;
  this.unionid = params.unionid;
  this.remark = params.remark;
  this.groupid = params.groupid;
  this.tagid_list = params.tagid_list;
}

User.prototype.save = function () {
  var that = this;
  console.log("log that" + JSON.stringify(that));
  pool.getConnection(function(err, connection){
    if (err) {
      return;
    } else {
      connection.query("replace into user_list set ?", {
        openid: that.openid,
        subscribe: that.subscribe,
        nickname: that.nickname,
        sex: that.sex,
        language: that.language,
        city: that.city,
        province: that.province,
        headimgurl: that.headimgurl,
        subscribe_time: that.subscribe_time,
        unionid: that.unionid,
        remark: that.remark,
        groupid: that.groupid,
        tagid_list: JSON.stringify(that.tagid_list)
      }, function(err, result){
        if (err) {
          console.log(err) ;
          connection.release();
          return;
        } else {

          connection.release();
        }
      });
    }
  });
};

User.init = function(){
  console.log('\nwaiting init user...');
  wxRequest.getMemberList().then(res => {
    console.log('\n init user db res:' + JSON.stringify(res));
    pool.getConnection(function(err, connection){
      if (err) {
        return;
      }
      var users = res.data.openid;
      users.forEach(function(user){
        connection.query("replace into user_list set ?", {openid:user}, function(err, result){
          if (err) {
            console.log(err);
          } else {
            console.log('success insert');
          }
        });
      });
    });
  });
}


module.exports = User;

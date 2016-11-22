var mysql = require('mysql');
var $conf = require('../conf/db_conf');
var sql = require('../sql/groupSql');
var wxRequest = require('../lib/wxRequest');

var pool = mysql.createPool($conf.mysql);

function Group(id, name, count) {
  this.id = id;
  this.name = name;
  this.count = count;
}

Group.init = function () {
  // body...
  console.log('init group db:');
  wxRequest.queryGroupList().then(res => {
    console.log('\ninit group db res:' + JSON.stringify(res));
    const groups = res.groups;
    pool.getConnection(function(err, connection) {
      if (err) {
        return;
      }
      groups.forEach(function(group){
        connection.query("replace into groups set ?",
        {id:group.id, name:group.name, count:group.count},
        function(err, result) {
          if (err) {
            console.log('insert :' + err);
          } else {
            console.log('success');
          }
        });
      });
    });
  });
};

module.exports = Group;

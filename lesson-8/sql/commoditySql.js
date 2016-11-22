var commodity = {
  query: {
    commoditys: 'SELECT * FROM KC',
    commodityById: 'SELECT * FROM KC WHERE XH=?',
    // select * from KC where PYDM like "%DC%"
    commodityByName: "SELECT * FROM KC WHERE PYDM like \"%?%\";",
    commodityInfoById: 'SELECT * FROM commodity_info WHERE XH=?',
    commodityReportInfo: 'SELECT * FROM (position_report left join users on position_report.uid=users.uid) left join kc on position_report.good_id=kc.XH WHERE status=0 order by time_stamp desc'
  },
  update: {
    commodityInfo: {
      all: 'UPDATE commodity_info SET pics=?, location=? WHERE XH=?',
      pics: 'UPDATE commodity_info SET pics=? WHERE XH=?',
      location: 'UPDATE commodity_info SET location=? WHERE XH=?',
      report: 'UPDATE position_report SET status=? WHERE no=?'
      // UPDATE position_report SET status=1 WHERE good_id=42618
    }
  },
  insert: {
    // INSERT INTO commodity_info (XH, pics, location) VALUES (1, '123', 'fff')
    // connection.query('INSERT INTO users SET ?',{username:'RITSU',firstname:'yan'},
    commodityInfo: 'INSERT INTO commodity_info SET ?',
    commodityNewPosition: 'INSERT INTO position_report SET ?'
  }
}

module.exports = commodity;

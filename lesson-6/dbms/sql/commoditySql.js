var commodity = {
  query: {
    commoditys: 'SELECT * FROM KC',
    commodityById: 'SELECT * FROM KC WHERE XH=?',
    commodityByName: 'SELECT * FROM KC WHERE name=?',
    commodityInfoById: 'SELECT * FROM commodity_info WHERE XH=?'
  },
  update: {
    commodityInfo: {
      all: 'UPDATE commodity_info SET pics=?, location=? WHERE XH=?',
      pics: 'UPDATE commodity_info SET pics=? WHERE XH=?',
      location: 'UPDATE commodity_info SET location=? WHERE XH=?',
    }
  },
  insert: {
    // INSERT INTO commodity_info (XH, pics, location) VALUES (1, '123', 'fff')
    // connection.query('INSERT INTO users SET ?',{username:'RITSU',firstname:'yan'},
    commodityInfo: 'INSERT INTO commodity_info SET ?'
  }
}

module.exports = commodity;

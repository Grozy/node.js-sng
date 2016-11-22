var users = {
  query: {
    users: 'SELECT * FROM users',
    userById: 'SELECT * FROM users WHERE uid=?',
    userByAccount: 'SELECT * FROM users WHERE account=?',
    userByName: 'SELECT * FROM users WHERE name=?',
    adminByAccount: 'SELECT * FROM admin WHERE account=?'
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
    user: 'INSERT INTO users SET ?'
  }
}

module.exports = users;

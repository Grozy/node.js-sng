var user = {
  insert: 'INSERT INTO user(id, name, password, email) VALUE(0,?,?,?)',
  delete: 'DELETE FROM user WHERE id=?',
  queryById:  'SELECT * FROM user WHERE id=?',
  queryAll: 'SELECT * FROM user',
  queryByName: 'SELECT * FROM user WHERE name=?'
}

module.exports = user;

var user = {
  insert: 'INSERT INTO user(id, name, age) VALUE(0,?,?)',
  delete: 'DELETE FROM user WHERE id=?',
  queryById:  'SELECT * FROM user WHERE id=?',
  queryAll: 'SELECT * FROM user'
}

module.exports = user;

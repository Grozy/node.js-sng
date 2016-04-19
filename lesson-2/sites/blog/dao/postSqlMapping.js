var post = {
  insert: 'INSERT INTO post(id, user_id, title, post, time_stamp) VALUE(0,?,?,?,?)',
  queryByUserId: 'SELECT * FROM user join post on user.id=post.user_id and user.id=?',
  queryByTopicIdBelongToUserId: 'SELECT * FROM user join post on user.id=post.user_id and user.id=? and post.id=?',
}

module.exports = post;

var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/:id', function(req, res) {
  var currentUser = req.session.user,
  user_id = null,
  topic_id = req.params.id;

  if (currentUser) {
    user_id = currentUser.id;
  }
  Post.getOne(topic_id, user_id, function(err, result) {
    if (result[0] && result) {
      topic = result[0];
      res.render('topic', {
        title: '主页',
        user: req.session.user,
        posts: topic,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    }
    else {
      res.render('error', err);
    }
  });
});

module.exports = router;

exports.authorize = function (req, res, next) {
  if (!req.session.openid) {
    res.redirect('auth');
  } else {
    next();
  }
};

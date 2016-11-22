var router = require('express').Router();
var wxRequest = require('../lib/wxRequest');

router.get('/', function(req, res) {
  wxRequest.queryGroupList().then(body => {
    console.log(body);
    res.render('groupManager', {groups: body.groups });
  });
});

router.get('/list', function(req, res) {
  wxRequest.getMemberList().then(body => {
    console.log('result123:' + JSON.stringify(body));
    var openids = body.data.openid;
    res.render('grouplist', {openids: openids});
  });
});

router.get('/member', function(req, res) {
  if (req.query["openid"]) {
    const openid = req.query.openid;
    wxRequest.getMemberInfo(openid).then(user => {
      console.log(JSON.stringify(user));
      res.render('info', user);
    });
  }
});

router.post('/create', function(req, res) {
  console.log("create : " + JSON.stringify(req.body));
  var groupTitle = req.body.group_title;
  wxRequest.groupCreate(groupTitle).then(res => {
    console.log("create result:" + res);
  });
});

module.exports = router;

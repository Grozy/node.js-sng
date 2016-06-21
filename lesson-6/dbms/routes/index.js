var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadFile', function(req, res, next) {
  res.send('!!!...上传文件...!!!');
});

module.exports = router;

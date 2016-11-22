var router = require("express").Router();

const Commodity = require('../model/commodity');

router.get('/', function(req, res){
  console.log('enter commodity index...');
  Commodity.queryWithLJM(req.query.ljm, function(err, commoditys) {
    console.log("err" + commoditys);
    res.send(commoditys);//登出成功后跳转到主页
  });
});

router.get('/info', function)

module.exports = router;

var express = require('express');
var router = express.Router();
var Commodity = require('../models/commodity');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('commodity');
});

router.get('/list', function (req, res, next) {
  Commodity.getAll(function(err, commoditys) {
    var data = [] //response data
    commoditys.forEach(function(commodity) {
      var result = {}
      result.no = commodity.XH
      result.name = commodity.LJM
      result.retail_price = commodity.SJ
      result.trade_price = commodity.PFJ
      data.push(result)
    });
    res.jsonp({
      status:'200',
      data:data
    });
  });
})

router.get('/item', function (req, res, next) {
  //req,query exam: {no: 10}
  var commodity_id = req.query.no;
  Commodity.getOne(commodity_id, function (err, commodity) {
    var data = {}
    if (commodity) {
      data.no = commodity.XH
      data.name = commodity.LJM
      data.retail_price = commodity.SJ
      data.trade_price = commodity.PFJ
      data.location = commodity.CW
      data.unit = commodity.DW
    }
    res.jsonp({
      status:'200',
      data:data
    });
  });
})

router.post('/update', function (req, res, next) {
  /*
  req,query exam: {no: 10}
  必传参数 no :货物编号
        pics :货物的样品图片
    location :货物的位置
  */
  console.log('body: ' + req.body.location);
  var commodity_id = req.body.no
  var commodityInfo = Commodity.getInfo(commodity_id, function(err, commodityInfo) {
    var location = req.body.location;
    var pics = req.body.pics;
    var commodity = new Commodity(commodity_id, location, pics);
    commodity.updateInfo(function(err, result) {
      var data = {}
      if (err) {
        data.status = 403
        data.message = err
      } else {
        data.status = 200
        data.message = "更新成功"
      }
      res.jsonp(data)
    });
  });
})

module.exports = router;

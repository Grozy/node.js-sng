var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('commodity');
});

router.get('/list', function (req, res, next) {
  res.jsonp({
    status:'200',
    data:[{
      no: 9,
      name: "48V12电瓶",
      provider: "陈太鹏",
      unit: "组",
      bid: 260.00,
      trade_price: 320.00,
      retail_price: 350.00,
    },{
      no: 10,
      name: "48V20电瓶",
      provider: "陈太鹏",
      unit: "组",
      bid: 290.00,
      trade_price: 340.00,
      retail_price: 300.00,
    }]
  });
})

router.get('/item', function (req, res, next) {
  console.log(req.query);
  res.jsonp({
    status:'200',
    data:{
      no: 10,
      name: "48V20电瓶",
      provider: "陈太鹏",
      unit: "组",
      bid: 290.00,
      trade_price: 340.00,
      retail_price: 300.00,
    }
  });
})

module.exports = router;

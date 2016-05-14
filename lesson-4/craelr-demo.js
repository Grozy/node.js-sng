var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl = 'https://site.douban.com/widget/photos/1766806/'

request(requrl, function(error, response, body){
  if (!error && response.statusCode==200) {
    // console.log(body);
    acquirData(body);
  }
})

function acquirData(data) {
  var $ = cheerio.load(data);
  var meizi = $('.photo-item img').toArray();
  console.log(meizi.length);
  var len = meizi.length;
  for (var i = 0; i < len; i++) {
    var imgsrc = meizi[i].attribs.src;
    console.log(imgsrc);
    var filename = parseUrlForFileName(imgsrc);
    downloadImg(imgsrc, filename, function(){

    });
  }
}

function parseUrlForFileName(address) {
  return path.basename(address);
}

function downloadImg(uri, filename, callback) {
  request.head(uri, function(err, res, body){
    if (err) {
      console.log('err: ' + err);
      return false;
    }
    console.log('res : ' + res);
    console.log(__dirname);
    request(uri).pipe(fs.createWriteStream(__dirname + '/images/' + filename)).on('close', callback);
  });
}

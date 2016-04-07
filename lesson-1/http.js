var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res){
    var postData = '';
    req.setEncoding('utf8')
    req.on('data', function(trunk){
        postData += trunk;
    });
    req.on('end', function(){
        res.end(postData);
    });
}).listen(8000);
console.log('服务器启动完成');

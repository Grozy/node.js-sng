const app = require('./app');
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 80);

var http = require('http');
var server = http.createServer(app);

server.listen(PORT, function(err){
  console.log('App start');
});

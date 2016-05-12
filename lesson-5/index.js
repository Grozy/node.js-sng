var koa = require('koa');

var app = new koa();

app.use(function *(){
  console.log(this.query);
});

app.listen(3000);

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// 设置静态文件
app.use(express.static(__dirname + '/public'));

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create( {
	default: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//新增路由
app.get('/', function(req, res){
	res.render('home');
});

var fortune = require('./lib/fortune.js');
app.get('/about', function(req, res){
	res.render('about', {
		fortune: fortune.getFortune()
	});
});


//定制404页面
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// 定制500页面
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});


var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// 设置静态文件
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create( {
	default: 'main',
	helpers: {
		section: function(name, options){
			if (!this._sections) { //如果_sections为空便初始化
				this._sections = {}
			}
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 创建一个中间件
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = getWeatherData();
	next();
});

var jqupload = require('jquery-file-upload-middleware');
app.use('/upload', function(req, res, next){
	var now = Date.now();
	jqupload.fileHandler({
		uploadDir: function(){
			return __dirname + '/public/uploads/' + now;
		},
		uploadUrl: function(){
			return '/uploads/' + now;
		}
	})(req, res, next);
});

//新增路由
app.get('/', function(req, res){
	res.render('home');
});

var fortune = require('./lib/fortune.js');
app.get('/about', function(req, res){
	res.render('about', {
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/test-about.js'
	});
});

// tours
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// read header
app.get('/headers', function(req, res){
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' +req.headers[name] + '\n';
	res.send(s);
});

// api
var tours = require('./lib/tours.js')
app.get('/api/tours', function(req, res){
	res.json(tours.getAllTours());
});

app.get('/form', function(req, res){
	res.render('form');
});

app.post('/process', function(req, res){
	if (req.xhr || req.accepts('json,html') === 'json') {
		res.send({ success: true});
	} else {
			console.log('--------------------------------');
			console.log('Form (from querystring)：' + req.query.form);
			console.log('CSRF token (from hidden form field)：' + req.body._csrf);
			console.log('Name (from visible form field)：' + req.body.name);
			console.log('Email (from visible form field)：' + req.body.email);
			console.log('--------------------------------');
			res.redirect(303, '/thank-you');//请求成功之后，处理数据，并重定向到thank-you页面
	}
});

app.get('/contest/vacation-photo', function(req,res){
	var now = new Date();
	res.render('contest/vacation-photo',{
		year: now.getFullYear(),
		month: now.getMonth()
	});
});

app.get('/contest/upload-photo', function(req, res){
	res.render('contest/upload-photo');
});

var formidable = require('formidable');
app.post('/contest/vacation-photo/:year/:month', function(req, res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if (err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files');
		console.log(files);
		res.redirect(303, '/thank-you')
	});
})

app.get('/newsletter', function(req, res){
	res.render('newsletter', {csrf: 'CSRF token gose here'});
});

app.get('/thank-you', function(req, res){
	res.render('thank-you');
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
	next();
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});

function getWeatherData(){
	return {
		locations:[
			{
				name: 'Portland',
				forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
				weather: 'Overcast',
	            temp: '54.1 F (12.3 C)',
			},
			{
				name: 'Bend',
				forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
				weather: 'Partly Cloudy',
				temp: '55.0 F (12.8 C)',
			},
			{
				name: 'Manzanita',
				forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
				iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
				weather: 'Light Rain',
				temp: '55.0 F (12.8 C)',
			}
		]
	};
}

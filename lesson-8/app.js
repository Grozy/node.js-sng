const express = require('express');
const path = require('path');
const flash = require('connect-flash');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const groupDB = require('./model/group');
const userDB = require('./model/user');


const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const getToken = require('./lib/token');
getToken();

// -------------------------- got token ---------------------

const wxMenu = require('./lib/wxMenu');
wxMenu();

const app = express();
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}));

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: '123456',
  name: 'openid',
  cookie: {maxAge: 80000},
  resave: false,
  saveUninitialized: true,
}));
//set view engine
app.set('view engine', 'ejs');
//set static
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./router/index');
const wechat = require('./router/wechat');
const auth = require('./router/auth');
const group = require('./router/group');
const commodity = require('./router/commodity');

app.use('/', index);
app.use('/wechat', wechat);
app.use('/auth', auth);
app.use('/group', group);
app.use('/commodity', commodity);

groupDB.init();
userDB.init();

module.exports = app;

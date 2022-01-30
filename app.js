var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

const mongoDbConnectionString = require('./connect.js'); // imported for privacy


var app = express();

// set up monggose connection
var mongoose = require('mongoose');
var mongoDB = mongoDbConnectionString;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
// bind connection to error event to view errors
db.on('error', console.error.bind(console, "MongoDb connection error"));

// set default express engine and extension
// It works without this, saving just in case
// app.engine('html', nunjucks.render);
// app.set('view engine', 'html');

// configure nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // add catlog routes to middleware chain

module.exports = app;

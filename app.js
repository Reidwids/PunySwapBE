var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
require('dotenv').config();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var app = express();
const port = process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// Initialize DB
mongoose.connect(
	process.env.mongoDBURL,
	{
		useNewURLParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log('Connected to MongoDB');
	}
);
app.listen(port, () => console.log(`Port ${port} is running`));
module.exports = app;

var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var ENV = process.env.ENV || 'dev';

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var logger = require('./lib/logger');
app.use(require('morgan')("combined", { "stream": logger.stream }));

logger.info('Registering Homepage service at /');
var index = require('./routes/index');
app.use('/', index);

var statusService = require('./routes/status');
app.use('/status', statusService);

logger.info('Registering Name service at /name');
var name = require('./routes/name');
app.use('/name', name);

logger.info('Registering User service at /login');
logger.info('Registering User service at /create-user');
var userService = require('./routes/user');
app.use('/user', userService);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	res.status(err.status).json({ http_status: { status: err.status, message: err.message } });
	next(err);
});

app.listen(PORT);
logger.info('Server running on port ' + PORT);
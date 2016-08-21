var http = require('http');

var logger = require('../../lib/logger');

module.exports.testLogin = function(err, next) {
	if(err){
		logger.error(err);
		next(true);
		return;
	}

	logger.info("Testing User Login Service.");

	var body = JSON.stringify({
		username:"test",
		password:"test"
	});

	var options = {
		host: 'localhost',
		port: 8080,
		path: "/user/login",
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		}
	};
	logger.debug("Sending " + options.method + " request to " + options.host + ":" + options.port + options.path + " with body: " + body);
	var req = new http.ClientRequest(options);
	req.end(body);
	req.on('response', function(res){
		res.on('data',function(data){
			logger.debug("Response is: " + data);
			data=='test has logged in!' ? logger.info("User Login Service test passed.") : logger.info("User Login Service test failed.");

			//Call call-back method
			if (next) next();
		})
	});
};

module.exports.testGetUser = function(err, username, next) {
	if(err){
		logger.error(err);
		next(true);
		return;
	}

	logger.info("Testing User GET Service.");

	var options = {
		host: 'localhost',
		port: 8080,
		path: "/user/" + username,
		method: "GET",
	};
	logger.debug("Sending " + options.method + " request to " + options.host + ":" + options.port + options.path);
	var req = new http.ClientRequest(options);
	req.end();
	req.on('response', function(res){
		res.on('data',function(data){
			logger.debug("Response is: " + data);
			data==JSON.stringify({ users: [{ username:username },] }) ? logger.info("User GET Service test passed.") : logger.info("User GET Service test failed.");

			//Call call-back method
			if (next) next();
		})
	});
};

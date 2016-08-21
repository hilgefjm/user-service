var http = require('http');

var logger = require('../../lib/logger');

module.exports.testName = function(err, next){
	if(err){
		logger.error(err);
		next(true);
		return;
	}

	logger.info("Testing Name Service.");

	var options = {
		host: 'localhost',
		port: 8080,
		path: "/name/test",
		method: "GET"
	};
	logger.debug("Sending GET request to " + options.host + ":" + options.port + options.path);
	var req = new http.ClientRequest(options);
	req.end();
	req.on('response', function(res){
		res.on('data',function(data){
			logger.debug("Response is: " + data);
			data=='Hello test!' ? logger.info("Name Service test passed.") : logger.info("Name Service test failed.");


			//Call call-back method
			if (next) next();
		})
	});
}


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
    username: "test",
    password: "test",
    email: "test"
  });

  var options = {
    host: 'localhost',
    port: 8080,
    path: "/login",
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
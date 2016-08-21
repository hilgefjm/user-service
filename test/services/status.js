var http = require('http');

var logger = require('../../lib/logger');

module.exports.testStatus = function(err, status, next){
	if(err){
		logger.error(err);
		next(true);
		return;
	}

	logger.info("Testing Status Service.");

	var options = {
		host: 'localhost',
		port: 8080,
		path: "/status/" + status,
		method: "GET"
	};
	logger.debug("Sending GET request to " + options.host + ":" + options.port + options.path);
	var req = new http.ClientRequest(options);
	req.end();
	req.on('response', function(res){
		res.on('data',function(data){
			logger.debug("Response is: " + data);
			data==JSON.stringify({ http_status: { status: status, message: getHttpStatus(status) } }) || data==JSON.stringify({ http_status: { status: 400, message: "Bad Request" } }) ? logger.info("Status Service test passed.") : logger.info("Status Service test failed.");

			//Call call-back method
			if (next) next();
		});
	});
};

function getHttpStatus(code){
	var msg = "";
  switch(code){
  	case 100:
		msg = HTTP_STATUS_CODE.HTTP_100;
		break;
	case 101:
		msg = HTTP_STATUS_CODE.HTTP_101;
		break;
	case 102:
		msg = HTTP_STATUS_CODE.HTTP_102;
		break;
	case 200:
		msg = HTTP_STATUS_CODE.HTTP_200;
		break;
	case 201:
		msg = HTTP_STATUS_CODE.HTTP_201;
		break;
	case 202:
		msg = HTTP_STATUS_CODE.HTTP_202;
		break;
	case 203:
		msg = HTTP_STATUS_CODE.HTTP_203;
		break;
	case 204:
		msg = HTTP_STATUS_CODE.HTTP_204;
		break;
	case 205:
		msg = HTTP_STATUS_CODE.HTTP_205;
		break;
	case 206:
		msg = HTTP_STATUS_CODE.HTTP_206;
		break;
	case 207:
		msg = HTTP_STATUS_CODE.HTTP_207;
		break;
	case 208:
		msg = HTTP_STATUS_CODE.HTTP_208;
		break;
	case 226:
		msg = HTTP_STATUS_CODE.HTTP_226;
		break;
	case 300:
		msg = HTTP_STATUS_CODE.HTTP_300;
		break;
	case 301:
		msg = HTTP_STATUS_CODE.HTTP_301;
		break;
	case 302:
		msg = HTTP_STATUS_CODE.HTTP_302;
		break;
	case 303:
		msg = HTTP_STATUS_CODE.HTTP_303;
		break;
	case 304:
		msg = HTTP_STATUS_CODE.HTTP_304;
		break;
	case 305:
		msg = HTTP_STATUS_CODE.HTTP_305;
		break;
	case 306:
		msg = HTTP_STATUS_CODE.HTTP_306;
		break;
	case 307:
		msg = HTTP_STATUS_CODE.HTTP_307;
		break;
	case 308:
		msg = HTTP_STATUS_CODE.HTTP_308;
		break;
	case 400:
		msg = HTTP_STATUS_CODE.HTTP_400;
		break;
	case 401:
		msg = HTTP_STATUS_CODE.HTTP_401;
		break;
	case 402:
		msg = HTTP_STATUS_CODE.HTTP_402;
		break;
	case 403:
		msg = HTTP_STATUS_CODE.HTTP_403;
		break;
	case 404:
		msg = HTTP_STATUS_CODE.HTTP_404;
		break;
	case 405:
		msg = HTTP_STATUS_CODE.HTTP_405;
		break;
	case 406:
		msg = HTTP_STATUS_CODE.HTTP_406;
		break;
	case 407:
		msg = HTTP_STATUS_CODE.HTTP_407;
		break;
	case 408:
		msg = HTTP_STATUS_CODE.HTTP_408;
		break;
	case 409:
		msg = HTTP_STATUS_CODE.HTTP_409;
		break;
	case 410:
		msg = HTTP_STATUS_CODE.HTTP_410;
		break;
	case 411:
		msg = HTTP_STATUS_CODE.HTTP_411;
		break;
	case 412:
		msg = HTTP_STATUS_CODE.HTTP_412;
		break;
	case 413:
		msg = HTTP_STATUS_CODE.HTTP_413;
		break;
	case 414:
		msg = HTTP_STATUS_CODE.HTTP_414;
		break;
	case 415:
		msg = HTTP_STATUS_CODE.HTTP_415;
		break;
	case 416:
		msg = HTTP_STATUS_CODE.HTTP_416;
		break;
	case 417:
		msg = HTTP_STATUS_CODE.HTTP_417;
		break;
	case 418:
		msg = HTTP_STATUS_CODE.HTTP_418;
		break;
	case 421:
		msg = HTTP_STATUS_CODE.HTTP_421;
		break;
	case 422:
		msg = HTTP_STATUS_CODE.HTTP_422;
		break;
	case 423:
		msg = HTTP_STATUS_CODE.HTTP_423;
		break;
	case 424:
		msg = HTTP_STATUS_CODE.HTTP_424;
		break;
	case 426:
		msg = HTTP_STATUS_CODE.HTTP_426;
		break;
	case 428:
		msg = HTTP_STATUS_CODE.HTTP_428;
		break;
	case 429:
		msg = HTTP_STATUS_CODE.HTTP_429;
		break;
	case 431:
		msg = HTTP_STATUS_CODE.HTTP_431;
		break;
	case 451:
		msg = HTTP_STATUS_CODE.HTTP_451;
		break;
	case 500:
		msg = HTTP_STATUS_CODE.HTTP_500;
		break;
	case 501:
		msg = HTTP_STATUS_CODE.HTTP_501;
		break;
	case 502:
		msg = HTTP_STATUS_CODE.HTTP_502;
		break;
	case 503:
		msg = HTTP_STATUS_CODE.HTTP_503;
		break;
	case 504:
		msg = HTTP_STATUS_CODE.HTTP_504;
		break;
	case 505:
		msg = HTTP_STATUS_CODE.HTTP_505;
		break;
	case 506:
		msg = HTTP_STATUS_CODE.HTTP_506;
		break;
	case 507:
		msg = HTTP_STATUS_CODE.HTTP_507;
		break;
	case 508:
		msg = HTTP_STATUS_CODE.HTTP_508;
		break;
	case 510:
		msg = HTTP_STATUS_CODE.HTTP_510;
		break;
	case 511:
		msg = HTTP_STATUS_CODE.HTTP_511;
		break;
  	default:
  		msg = HTTP_STATUS_CODE.HTTP_400;
  }
  return msg;
}

var HTTP_STATUS_CODE = {
	"HTTP_100":"Continue",
	"HTTP_101":"Switching Protocols",
	"HTTP_102":"Processing",
	"HTTP_200":"Ok",
	"HTTP_201":"Created",
	"HTTP_202":"Accepted",
	"HTTP_203":"Non-Authoritative Information",
	"HTTP_204":"No Content",
	"HTTP_205":"Reset Content",
	"HTTP_206":"Partial Content",
	"HTTP_207":"Multi-Status",
	"HTTP_208":"Already Reported",
	"HTTP_226":"IM Used",
	"HTTP_300":"Multiple Choices",
	"HTTP_301":"Moved Permanently",
	"HTTP_302":"Not Found",
	"HTTP_303":"See Other",
	"HTTP_304":"Not Modified",
	"HTTP_305":"Use Proxy",
	"HTTP_306":"Switch Proxy",
	"HTTP_307":"Temporary Redirect",
	"HTTP_308":"Permanent Redirect",
	"HTTP_400":"Bad Request",
	"HTTP_401":"Unauthorized",
	"HTTP_402":"Payment Required",
	"HTTP_403":"Forbidden",
	"HTTP_404":"Not Found",
	"HTTP_405":"Method Not Allowed",
	"HTTP_406":"Not Acceptable",
	"HTTP_407":"Proxy Authentication Required",
	"HTTP_408":"Request Timeout",
	"HTTP_409":"Conflict",
	"HTTP_410":"Gone",
	"HTTP_411":"Length Required",
	"HTTP_412":"Precondition Failed",
	"HTTP_413":"Payload Too Large",
	"HTTP_414":"URI Too Long",
	"HTTP_415":"Unsupported Media Type",
	"HTTP_416":"Range Not Satisfiable",
	"HTTP_417":"Expectation Failed",
	"HTTP_418":"I'm a Teapot",
	"HTTP_421":"Misdirected Request",
	"HTTP_422":"Unprocessable Entity",
	"HTTP_423":"Locked",
	"HTTP_424":"Failed Dependency",
	"HTTP_426":"Upgrade Required",
	"HTTP_428":"Precondition Failed",
	"HTTP_429":"Too Many Requests",
	"HTTP_431":"Request Header Fields Too Large",
	"HTTP_451":"Unavailable For Legal Reasons",
	"HTTP_500":"Internal Server Error",
	"HTTP_501":"Not Implemented",
	"HTTP_502":"Bad Gateway",
	"HTTP_503":"Service Unavailable",
	"HTTP_504":"Gateway Timeout",
	"HTTP_505":"HTTP Version Not Supported",
	"HTTP_506":"Variant Also Negotiates",
	"HTTP_507":"Insufficient Storage",
	"HTTP_508":"Loop Detected",
	"HTTP_510":"Not Extended",
	"HTTP_511":"Network Authentication Required"
};
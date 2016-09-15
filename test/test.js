var logger = require('../lib/logger');

var statusServiceTest = require('./services/status');
var nameServiceTest = require('./services/name');
var userServiceTest = require('./services/user');
var loginServiceTest = require('./services/login');


statusServiceTest.testStatus(null, 200, function(){
	statusServiceTest.testStatus(null, 1000, function(){
		nameServiceTest.testName(null, function(){
			loginServiceTest.testLogin(null, function(){
				userServiceTest.testGetUser(null, 'test', function(){
					logger.info('Testing Complete.');
				});
			});
		});
	});
});
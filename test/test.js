var logger = require('../lib/logger');

var statusServiceTest = require('./services/status');
var nameServiceTest = require('./services/name');
var userServiceTest = require('./services/user');


statusServiceTest.testStatus(null, 200, function(){
	statusServiceTest.testStatus(null, 1000, function(){
		nameServiceTest.testName(null, function(){
			userServiceTest.testLogin(null, function(){
				userServiceTest.testGetUser(null, 'test', function(){
					logger.info('Testing Complete.');
				});
			});
		});
	});
});
var express = require('express');
var router = express.Router();

/* Respond hello NAME */
router.post('/login', function(req, res) {
  var username = req.body.username;
  var pwd = req.body.password;
  res.send(username + ' has logged in!');
});

/* GET request to RETRIEVE an EXISTING new user */
router.get('/:username', function(req, res) {
  var username = req.params.username;
  var user = {
  	users: [
  		{
  			username:username
  		},
  	]
  };
  res.json(user);
});

/* POST request to CREATE a new user */
router.post('/', function(req, res) {
  var username = req.body.username;
  var pwd = req.body.password;
  res.send(username + ' has been created!');
});

module.exports = router;

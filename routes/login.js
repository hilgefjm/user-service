'use strict';
var express = require('express');
var router = express.Router();

var loginService = require('../lib/login-service');

/* Login */
router.post('/', function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var pwd = req.body.password;
  loginService.register(username, pwd, email, function (err, results) {
    if (err) return res.status(400).send(err);

    res.send(results);
  });
});

module.exports = router;

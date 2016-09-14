var express = require('express');
var router = express.Router();

/* Respond hello NAME */
router.get('/', function (req, res) {
  res.send('Hello from Express Server!');
});

module.exports = router;

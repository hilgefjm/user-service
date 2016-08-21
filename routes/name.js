var express = require('express');
var router = express.Router();

/* Respond hello NAME */
router.get('/:id', function(req, res) {
  res.send('Hello ' + req.params.id + '!');
});

module.exports = router;

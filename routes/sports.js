var express = require('express');
var router = express.Router();
const sportController = require('../controllers/sports.Controller')

router.get('/',sportController.getAll)
module.exports = router
var express = require('express');
var router = express.Router();
const sportController = require('../controllers/sportsController')

router.get('/',sportController.getAll)
module.exports = router
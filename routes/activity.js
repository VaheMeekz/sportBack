var express = require('express');
var router = express.Router();
const activityController = require('../controllers/activityController')
router.post('/',activityController.create)
router.get('/',activityController.getAll)
router.get('/single',activityController.getSingle)

module.exports = router
var express = require('express');
var router = express.Router();
const activityController = require('../controllers/activity.Controller')
router.post('/',activityController.create)
router.post('/credentials',activityController.addOtherCredentials)
router.get('/',activityController.getAll)
router.get('/single',activityController.getSingle)
router.get('/myActivity',activityController.myActivityTime)
module.exports = router
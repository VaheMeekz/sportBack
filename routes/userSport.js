var express = require('express');
var router = express.Router();
const controller = require('../controllers/userSportsController')

router.get('/single',controller.getSingle)
router.post('/',controller.add)
router.post('/delete',controller.deleteItem)
module.exports = router
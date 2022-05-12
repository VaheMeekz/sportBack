var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.post('/',userController.create)
router.get('/',userController.getAll)
router.get('/single',userController.getSingle)
router.get('/userTeams',userController.getUserTeams)
router.get('/info',userController.info)
router.post('/logout',userController.logout)
router.post('/deactivate',userController.deactivateAccount)
module.exports = router;

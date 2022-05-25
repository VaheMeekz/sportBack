var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.Controller')

//create
router.post('/checkNumber', userController.checkNumber)
router.post('/',userController.create)
router.post('/credentials',userController.loginCredentials)
//deactivate account
router.post('/deactivate',userController.deactivateAccount)
//check login credentials
router.get('/credentials',userController.addCredentials)
//login
router.post('/login',userController.login)
router.post('/logout',userController.logout)
//edit user
router.post('/edit',userController.edit)
router.post('/changePassword',userController.changePassword)
router.post('/changeAvatar',userController.changeAvatar)
//all users
router.get('/',userController.getAll)
//single user
router.get('/single',userController.getSingle)
//user all team
router.get('/userTeams',userController.getUserTeams)
// watter
router.get('/info',userController.info)
//confirm password
router.post('/addCode',userController.conformPasswordAddCode)
router.post('/checkCode',userController.checkVerifyCode)
router.post('/newPassword',userController.newPassword)
module.exports = router;

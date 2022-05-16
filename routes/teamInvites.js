var express = require('express');
var router = express.Router();
const inviteController = require("../controllers/teamInvite.Controller")
router.post('/',inviteController.create)
router.get('/myInvites',inviteController.myInvites)
router.get('/my',inviteController.mySendedInvites)
router.post('/accept',inviteController.accept)
router.post('/reject',inviteController.reject)
module.exports = router
var express = require('express');
var router = express.Router();
const activityInviteController = require("../controllers/activityInvite.Controller")
router.post('/',activityInviteController.create)
router.get('/',activityInviteController.getMySendedInvites)
router.get('/my',activityInviteController.getMyInvites)
router.post('/accept',activityInviteController.accept)
router.post('/reject',activityInviteController.reject)
router.get('/myHistory',activityInviteController.myInvitesHistory)
router.get('/singleHistory',activityInviteController.singleHistory)
module.exports = router
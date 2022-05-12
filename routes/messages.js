var express = require('express');
var router = express.Router();
const messagesController = require("../controllers/messagesController")

router.post('/',messagesController.createMessage)
router.get('/',messagesController.receivers)
router.get('/my',messagesController.getMessages)
router.post('/unset',messagesController.unsetMessage)
router.post('/like',messagesController.like)
router.post('/unlike',messagesController.unlike)
router.post('/pine',messagesController.pinnedMessage)
router.post('/deletePine',messagesController.deletePinnedMessage)
router.post('/seen',messagesController.seen)

module.exports = router
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat_controller'); 

router.post('/', chatController.addMessage);
router.get('/messages', chatController.getMessages);

module.exports = router;

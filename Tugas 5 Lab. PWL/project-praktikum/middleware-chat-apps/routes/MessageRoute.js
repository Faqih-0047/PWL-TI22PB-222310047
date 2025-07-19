const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
const { authenticateUser } = require('../middlewares/authMidlleware');

router.post('/', authenticateUser, messageController.sendMessage);
router.get('/:user1_id/:user2_id', authenticateUser, messageController.getMessagesBetweenUsers);
router.put('/:id', authenticateUser, messageController.updateMessage);
router.delete('/:id', authenticateUser, messageController.deleteMessage);

module.exports = router;
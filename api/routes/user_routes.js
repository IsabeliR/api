const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/login', userController.loginUser);
router.get('/buscar', userController.listUsers);
router.post('/register', userController.registerUser);


module.exports = router;
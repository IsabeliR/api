const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/login', userController.loginUser);
router.get('/buscar', userController.listUsers);
router.post('/register', userController.registerUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.post('/login', userController.loginUser);
router.get('/buscar', userController.listUsers);
router.post('/register', userController.registerUser);
router.post('/update/:userId', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.post('/upload-photo', userController.updateProfilePhoto);
router.post('/avatar-usuario', userController.getAvatarUsuario);
router.post('/nome-usuario', userController.getUserName);


module.exports = router;
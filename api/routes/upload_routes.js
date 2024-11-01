// api/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const uploadController = require('../controllers/upload_controller');
const upload = require('../middleware/upload'); // Certifique-se de que o middleware de upload está correto

// Rota para upload de foto
router.post('/upload-photo', uploadController.uploadPhoto);

module.exports = router;
const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress_controller');

router.post('/', progressController.updateProgress);
router.get('/', progressController.buscarProgresso);

module.exports = router;

const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress_controller');


router.get('/', progressController.buscarProgresso);
router.post('/update', progressController.updateProgress);

module.exports = router;

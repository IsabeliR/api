const express = require('express');
const router = express.Router();
const productController = require('../controllers/materia_controller');

router.post('/create', productController.createProduct);
router.get('/find', productController.buscarProdutos);


module.exports = router;


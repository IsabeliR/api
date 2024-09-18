const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.post('/', productController.createProduct);
router.get('/', productController.buscarProdutos);


module.exports = router;


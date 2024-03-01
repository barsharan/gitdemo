const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to create a new product
router.post('/products', productController.createProduct);

module.exports = router;

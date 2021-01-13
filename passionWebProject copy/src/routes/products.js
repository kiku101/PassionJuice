const express = require('express');
const  { model } = require('mongoose');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.post('/store',productController.store);
router.post('/updateProduct',productController.updateProduct);
router.post('/deleteProduct',productController.deleteProduct);

router.get('/create',productController.createProduct)
router.get('/detailProduct',productController.detail);
router.get('/',productController.productRender);

module.exports = router;

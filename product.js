const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  subcategory: String,
  price: Number,
  quantity: Number,
  sellerId: String, // ID продавца из Firebase
  sellerName: String,
});

module.exports = mongoose.model('Product', productSchema);


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Получить все товары
router.get('/', productController.getAllProducts);

// Добавить товар
router.post('/', productController.addProduct);

module.exports = router;

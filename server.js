const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Обслуживание статических файлов из папки "public"
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к MongoDB (замените строку подключения на вашу)
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB подключена'))
  .catch(err => console.error('Ошибка подключения MongoDB:', err));

// Схема и модель товара
const productSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  name: String,
  description: String,
  sellerName: String,
  price: Number,
  stock: Number,
  sellerId: String,
  sellerEmail: String,
  timestamp: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

// Эндпоинт для добавления товара
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// Эндпоинт для получения всех товаров
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ timestamp: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
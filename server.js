const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Подключаем JSON-парсер и CORS
app.use(express.json());
app.use(cors());

// Подключение к MongoDB Atlas — замените строку подключения на свою
const uri = 'mongodb+srv://glovimplaye:ICjQNVFoG8brXIcN@cluster0.lsyvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключение к MongoDB Atlas успешно установлено'))
  .catch(err => console.error('Ошибка подключения к MongoDB Atlas:', err));

// Определение схемы и модели товара
const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  sellerName: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// API endpoint для добавления товара
app.post('/api/products', async (req, res) => {
  console.log('Полученные данные:', req.body);
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Товар успешно добавлен', product });
  } catch (err) {
    console.error('Ошибка при добавлении товара:', err);
    res.status(400).json({ message: 'Ошибка при добавлении товара', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

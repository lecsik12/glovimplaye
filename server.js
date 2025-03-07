// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Храним товары в памяти (после перезапуска — очищается)
let products = [];

// Получить все товары
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Добавить новый товар
app.post('/api/products', (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: 'Укажите название и цену товара' });
  }

  const newProduct = {
    id: Date.now(), // Генерация ID
    title,
    description: description || '',
    price
  };

  products.push(newProduct);
  return res.status(201).json({ message: 'Товар добавлен!', product: newProduct });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

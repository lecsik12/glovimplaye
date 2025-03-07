const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const transactionRoutes = require('./routes/transactions');
const chatRoutes = require('./routes/chats');

const app = express();

// Middleware
app.use(bodyParser.json());

// Маршруты
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chats', chatRoutes);

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключено к базе данных'))
  .catch((error) => console.error('Ошибка при подключении к базе данных:', error));

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});

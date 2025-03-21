// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Для реальных запросов к API платежной системы
const app = express();

// Разбор JSON в теле запроса
app.use(bodyParser.json());

// Статическая папка для клиентских файлов (например, HTML, CSS, JS)
app.use(express.static('public'));

/**
 * Эндпоинт для создания платежного запроса.
 * Принимает: amount, method, transactionId, userId, email
 * Возвращает paymentLink (ссылку для оплаты)
 */
app.post('/create-payment', async (req, res) => {
  const { amount, method, transactionId, userId, email } = req.body;

  // Здесь должен быть вызов API платежной системы (CryptoBot / CryptoPay)
  // Для демонстрации формируем ссылку вручную:
  let paymentLink = "";
  if(method === 'cryptobot') {
    // Пример ссылки для CryptoBot (здесь можно использовать ваш шаблон)
    paymentLink = `https://t.me/CryptoBot?start=send_${amount}_RUB_${transactionId}`;
  } else if(method === 'bankcard') {
    // Если выбран способ банковской карты — формируется другая ссылка или происходит редирект на платежный шлюз
    paymentLink = `https://yourbankgateway.example/pay?amount=${amount}&tx=${transactionId}`;
  }

  // Здесь можно сохранить транзакцию в БД для последующего отслеживания
  console.log(`Создана транзакция:
    ID пользователя: ${userId},
    Email: ${email},
    Сумма: ${amount},
    Метод: ${method},
    TransactionID: ${transactionId}`);

  res.json({ paymentLink });
});

/**
 * Эндпоинт для обработки webhook (обратного вызова) от платежной системы.
 * Здесь платежная система уведомляет сервер о статусе платежа.
 */
app.post('/payment-callback', (req, res) => {
  const { transactionId, status, amount } = req.body;
  console.log(`Webhook получен:
    TransactionID: ${transactionId},
    Статус: ${status},
    Сумма: ${amount}`);
  
  // Если статус "success" — обновите баланс пользователя в БД
  if (status === 'success') {
    // updateUserBalance(transactionId, amount);
  }
  
  // Отправляем подтверждение платежной системе
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

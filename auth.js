const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Регистрация нового пользователя
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username  !email  !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: 'Email уже используется' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Неверный email или пароль' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неверный email или пароль' });
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
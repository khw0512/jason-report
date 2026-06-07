const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured' });
  }
  if (password !== adminPassword) {
    return res.status(401).json({ error: '비밀번호가 올바르지 않습니다.' });
  }

  const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;

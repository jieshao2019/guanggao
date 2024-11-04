import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../db/index.js';

const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Check admin credentials
    if (username === 'admin' && password === 'admin123456') {
      const token = jwt.sign(
        { isAdmin: true },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
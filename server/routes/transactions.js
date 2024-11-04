import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get user transactions
router.get('/', auth, (req, res) => {
  try {
    const transactions = db.prepare(`
      SELECT * FROM transactions
      WHERE userId = ?
      ORDER BY createdAt DESC
      LIMIT 50
    `).all(req.user.id);

    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create withdrawal request
router.post('/withdraw', auth, (req, res) => {
  try {
    const { amount, method } = req.body;
    const minWithdraw = 10; // Minimum withdrawal amount

    if (amount < minWithdraw) {
      return res.status(400).json({ message: `Minimum withdrawal amount is $${minWithdraw}` });
    }

    // Check user balance
    const user = db.prepare('SELECT balance FROM users WHERE id = ?').get(req.user.id);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Start transaction
    db.transaction(() => {
      // Create withdrawal record
      db.prepare(`
        INSERT INTO transactions (userId, type, amount, method, status, description)
        VALUES (?, 'withdraw', ?, ?, 'pending', 'Withdrawal request')
      `).run(req.user.id, amount, method);

      // Update user balance
      db.prepare(`
        UPDATE users
        SET balance = balance - ?
        WHERE id = ?
      `).run(amount, req.user.id);
    })();

    res.json({ message: 'Withdrawal request submitted successfully' });
  } catch (error) {
    console.error('Withdrawal request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Convert points to balance
router.post('/convert', auth, (req, res) => {
  try {
    const { points } = req.body;
    const conversionRate = 1000; // 1000 points = $1

    if (points < conversionRate) {
      return res.status(400).json({ 
        message: `Minimum conversion amount is ${conversionRate} points` 
      });
    }

    // Check user points
    const user = db.prepare('SELECT points FROM users WHERE id = ?').get(req.user.id);
    if (user.points < points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    const amount = points / conversionRate;

    // Start transaction
    db.transaction(() => {
      // Create conversion record
      db.prepare(`
        INSERT INTO transactions (userId, type, amount, points, status, description)
        VALUES (?, 'convert', ?, ?, 'completed', 'Points conversion')
      `).run(req.user.id, amount, points);

      // Update user balance and points
      db.prepare(`
        UPDATE users
        SET balance = balance + ?,
            points = points - ?
        WHERE id = ?
      `).run(amount, points, req.user.id);
    })();

    res.json({ message: 'Points converted successfully' });
  } catch (error) {
    console.error('Points conversion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
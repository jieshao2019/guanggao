import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get VIP info
router.get('/', auth, (req, res) => {
  try {
    const vipLevels = db.prepare(`
      SELECT * FROM vip_packages
      WHERE status = 'active'
      ORDER BY level
    `).all();

    const userVip = db.prepare(`
      SELECT vipLevel, vipExpireAt
      FROM users
      WHERE id = ?
    `).get(req.user.id);

    res.json({
      currentLevel: userVip.vipLevel,
      expireAt: userVip.vipExpireAt,
      levels: vipLevels
    });
  } catch (error) {
    console.error('Get VIP info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase VIP
router.post('/purchase', auth, (req, res) => {
  try {
    const { level, months = 1 } = req.body;

    // Get package info
    const package = db.prepare(`
      SELECT * FROM vip_packages
      WHERE level = ? AND status = 'active'
    `).get(level);

    if (!package) {
      return res.status(400).json({ message: 'Invalid VIP package' });
    }

    const price = package.price * months;

    // Check user balance
    const user = db.prepare(`
      SELECT balance FROM users WHERE id = ?
    `).get(req.user.id);

    if (user.balance < price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Start transaction
    db.transaction(() => {
      // Create purchase record
      db.prepare(`
        INSERT INTO vip_purchases (
          userId, packageId, startDate, endDate
        ) VALUES (?, ?, CURRENT_TIMESTAMP, datetime('now', '+? months'))
      `).run(req.user.id, package.id, months);

      // Update user VIP status
      db.prepare(`
        UPDATE users
        SET balance = balance - ?,
            vipLevel = ?,
            vipExpireAt = datetime('now', '+? months')
        WHERE id = ?
      `).run(price, level, months, req.user.id);

      // Create payment record
      db.prepare(`
        INSERT INTO payment_records (
          userId, methodId, amount, fee, status, transactionId
        ) VALUES (?, 1, ?, 0, 'completed', ?)
      `).run(req.user.id, price, `VIP_${Date.now()}`);
    })();

    res.json({ message: 'VIP purchased successfully' });
  } catch (error) {
    console.error('Purchase VIP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
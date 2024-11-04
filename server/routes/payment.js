import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get payment methods
router.get('/methods', auth, (req, res) => {
  try {
    const methods = db.prepare(`
      SELECT * FROM payment_methods
      WHERE status = 'active'
      ORDER BY name
    `).all();

    res.json(methods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment records
router.get('/records', auth, (req, res) => {
  try {
    const records = db.prepare(`
      SELECT 
        pr.*,
        pm.name as methodName
      FROM payment_records pr
      JOIN payment_methods pm ON pr.methodId = pm.id
      WHERE pr.userId = ?
      ORDER BY pr.createdAt DESC
      LIMIT 50
    `).all(req.user.id);

    res.json(records);
  } catch (error) {
    console.error('Get payment records error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create withdrawal request
router.post('/withdraw', auth, (req, res) => {
  try {
    const { amount, methodId } = req.body;

    // Get payment method
    const method = db.prepare(`
      SELECT * FROM payment_methods WHERE id = ?
    `).get(methodId);

    if (!method) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Validate amount
    if (amount < method.minAmount || amount > method.maxAmount) {
      return res.status(400).json({ 
        message: `Amount must be between ${method.minAmount} and ${method.maxAmount}` 
      });
    }

    // Calculate fee
    const fee = amount * method.fee;

    // Check user balance
    const user = db.prepare(`
      SELECT balance FROM users WHERE id = ?
    `).get(req.user.id);

    if (user.balance < (amount + fee)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Start transaction
    db.transaction(() => {
      // Create payment record
      db.prepare(`
        INSERT INTO payment_records (
          userId, methodId, amount, fee, status, transactionId
        ) VALUES (?, ?, ?, ?, 'pending', ?)
      `).run(req.user.id, methodId, amount, fee, `WD_${Date.now()}`);

      // Update user balance
      db.prepare(`
        UPDATE users
        SET balance = balance - ?
        WHERE id = ?
      `).run(amount + fee, req.user.id);
    })();

    res.json({ message: 'Withdrawal request submitted successfully' });
  } catch (error) {
    console.error('Create withdrawal request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create recharge request
router.post('/recharge', auth, (req, res) => {
  try {
    const { amount, methodId } = req.body;

    // Get payment method
    const method = db.prepare(`
      SELECT * FROM payment_methods WHERE id = ?
    `).get(methodId);

    if (!method) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Validate amount
    if (amount < method.minAmount || amount > method.maxAmount) {
      return res.status(400).json({ 
        message: `Amount must be between ${method.minAmount} and ${method.maxAmount}` 
      });
    }

    // Calculate fee
    const fee = amount * method.fee;

    // Create payment record
    const result = db.prepare(`
      INSERT INTO payment_records (
        userId, methodId, amount, fee, status, transactionId
      ) VALUES (?, ?, ?, ?, 'pending', ?)
    `).run(req.user.id, methodId, amount, fee, `RC_${Date.now()}`);

    res.json({ 
      recordId: result.lastInsertRowid,
      message: 'Recharge request created successfully' 
    });
  } catch (error) {
    console.error('Create recharge request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
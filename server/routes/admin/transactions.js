import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get all transactions
router.get('/', adminAuth, (req, res) => {
  try {
    const { status = 'all', type = 'all', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        t.*,
        u.username
      FROM transactions t
      JOIN users u ON t.userId = u.id
      WHERE 1=1
    `;

    if (status !== 'all') {
      query += ` AND t.status = '${status}'`;
    }
    if (type !== 'all') {
      query += ` AND t.type = '${type}'`;
    }

    query += ` ORDER BY t.createdAt DESC LIMIT ? OFFSET ?`;

    const transactions = db.prepare(query).all(limit, offset);

    const total = db.prepare(`
      SELECT COUNT(*) as count
      FROM transactions t
      WHERE 1=1
      ${status !== 'all' ? ` AND status = '${status}'` : ''}
      ${type !== 'all' ? ` AND type = '${type}'` : ''}
    `).get().count;

    res.json({
      transactions,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update transaction status
router.put('/:id/status', adminAuth, (req, res) => {
  try {
    const { status } = req.body;
    const transactionId = req.params.id;

    // Start transaction
    db.transaction(() => {
      const transaction = db.prepare(`
        SELECT * FROM transactions WHERE id = ?
      `).get(transactionId);

      if (transaction.type === 'withdraw' && status === 'completed') {
        // Update user balance for completed withdrawal
        db.prepare(`
          UPDATE users
          SET balance = balance - ?
          WHERE id = ?
        `).run(transaction.amount, transaction.userId);
      }

      // Update transaction status
      db.prepare(`
        UPDATE transactions
        SET status = ?
        WHERE id = ?
      `).run(status, transactionId);
    })();

    res.json({ message: 'Transaction status updated' });
  } catch (error) {
    console.error('Update transaction status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
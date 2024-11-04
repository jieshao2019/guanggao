import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get shop items
router.get('/items', auth, (req, res) => {
  try {
    const items = db.prepare(`
      SELECT 
        i.*,
        ui.quantity,
        ui.expiresAt
      FROM shop_items i
      LEFT JOIN user_items ui ON i.id = ui.itemId AND ui.userId = ?
      WHERE i.status = 'active'
      ORDER BY i.type, i.price
    `).all(req.user.id);

    res.json(items);
  } catch (error) {
    console.error('Get shop items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase item
router.post('/items/:id', auth, (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const itemId = req.params.id;

    // Get item info
    const item = db.prepare(`
      SELECT * FROM shop_items
      WHERE id = ? AND status = 'active'
    `).get(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const totalPrice = item.price * quantity;

    // Check user points
    const user = db.prepare(`
      SELECT points FROM users WHERE id = ?
    `).get(req.user.id);

    if (user.points < totalPrice) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Start transaction
    db.transaction(() => {
      // Create or update user item
      const existingItem = db.prepare(`
        SELECT * FROM user_items
        WHERE userId = ? AND itemId = ?
      `).get(req.user.id, itemId);

      if (existingItem) {
        db.prepare(`
          UPDATE user_items
          SET quantity = quantity + ?
          WHERE id = ?
        `).run(quantity, existingItem.id);
      } else {
        db.prepare(`
          INSERT INTO user_items (userId, itemId, quantity)
          VALUES (?, ?, ?)
        `).run(req.user.id, itemId, quantity);
      }

      // Deduct points
      db.prepare(`
        UPDATE users
        SET points = points - ?
        WHERE id = ?
      `).run(totalPrice, req.user.id);

      // Create purchase record
      db.prepare(`
        INSERT INTO shop_purchases (
          userId, itemId, quantity, points
        ) VALUES (?, ?, ?, ?)
      `).run(req.user.id, itemId, quantity, totalPrice);
    })();

    res.json({ message: 'Item purchased successfully' });
  } catch (error) {
    console.error('Purchase item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Use item
router.post('/items/:id/use', auth, (req, res) => {
  try {
    const itemId = req.params.id;

    // Get user item
    const userItem = db.prepare(`
      SELECT ui.*, i.type, i.duration
      FROM user_items ui
      JOIN shop_items i ON ui.itemId = i.id
      WHERE ui.userId = ? AND ui.itemId = ?
    `).get(req.user.id, itemId);

    if (!userItem || userItem.quantity < 1) {
      return res.status(400).json({ message: 'Item not available' });
    }

    // Start transaction
    db.transaction(() => {
      // Update quantity
      db.prepare(`
        UPDATE user_items
        SET quantity = quantity - 1
        WHERE id = ?
      `).run(userItem.id);

      // Create usage record
      db.prepare(`
        INSERT INTO item_usage (
          userId, itemId, expiresAt
        ) VALUES (?, ?, datetime('now', '+? minutes'))
      `).run(req.user.id, itemId, userItem.duration || 0);
    })();

    res.json({ message: 'Item used successfully' });
  } catch (error) {
    console.error('Use item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
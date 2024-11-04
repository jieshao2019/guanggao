import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get blocked users
router.get('/', auth, (req, res) => {
  try {
    const blocks = db.prepare(`
      SELECT 
        b.*,
        u.username,
        u.avatar
      FROM user_blocks b
      JOIN users u ON b.blockedId = u.id
      WHERE b.userId = ?
      ORDER BY b.createdAt DESC
    `).all(req.user.id);

    res.json(blocks);
  } catch (error) {
    console.error('Get blocks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Block user
router.post('/:id', auth, (req, res) => {
  try {
    const blockedId = req.params.id;

    // Check if already blocked
    const existing = db.prepare(`
      SELECT * FROM user_blocks
      WHERE userId = ? AND blockedId = ?
    `).get(req.user.id, blockedId);

    if (existing) {
      return res.status(400).json({ message: 'User already blocked' });
    }

    // Add block
    db.prepare(`
      INSERT INTO user_blocks (userId, blockedId)
      VALUES (?, ?)
    `).run(req.user.id, blockedId);

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unblock user
router.delete('/:id', auth, (req, res) => {
  try {
    db.prepare(`
      DELETE FROM user_blocks
      WHERE userId = ? AND blockedId = ?
    `).run(req.user.id, req.params.id);

    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Unblock user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
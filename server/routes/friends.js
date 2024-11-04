import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get friends list
router.get('/', auth, (req, res) => {
  try {
    const friends = db.prepare(`
      SELECT 
        u.id, u.username, u.vipLevel,
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM game_scores gs 
            WHERE gs.userId = u.id 
            ORDER BY gs.createdAt DESC 
            LIMIT 1
          ) THEN 'playing'
          ELSE 'offline'
        END as status
      FROM users u
      JOIN friends f ON (f.userId = ? AND f.friendId = u.id) OR (f.friendId = ? AND f.userId = u.id)
      WHERE f.status = 'accepted'
    `).all(req.user.id, req.user.id);

    res.json(friends);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send friend request
router.post('/request/:userId', auth, (req, res) => {
  try {
    const friendId = parseInt(req.params.userId);

    // Check if request already exists
    const existing = db.prepare(`
      SELECT * FROM friends 
      WHERE (userId = ? AND friendId = ?) OR (userId = ? AND friendId = ?)
    `).get(req.user.id, friendId, friendId, req.user.id);

    if (existing) {
      return res.status(400).json({ message: 'Friend request already exists' });
    }

    // Create friend request
    db.prepare(`
      INSERT INTO friends (userId, friendId, status)
      VALUES (?, ?, 'pending')
    `).run(req.user.id, friendId);

    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept/reject friend request
router.put('/request/:userId', auth, (req, res) => {
  try {
    const { status } = req.body;
    const friendId = parseInt(req.params.userId);

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    db.prepare(`
      UPDATE friends
      SET status = ?
      WHERE friendId = ? AND userId = ? AND status = 'pending'
    `).run(status, req.user.id, friendId);

    res.json({ message: `Friend request ${status}` });
  } catch (error) {
    console.error('Update friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove friend
router.delete('/:userId', auth, (req, res) => {
  try {
    const friendId = parseInt(req.params.userId);

    db.prepare(`
      DELETE FROM friends
      WHERE (userId = ? AND friendId = ?) OR (userId = ? AND friendId = ?)
    `).run(req.user.id, friendId, friendId, req.user.id);

    res.json({ message: 'Friend removed' });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
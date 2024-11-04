import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Search users
router.get('/search', auth, (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const users = db.prepare(`
      SELECT id, username, vipLevel
      FROM users
      WHERE 
        id != ? AND
        (username LIKE ? OR id = ?) AND
        id NOT IN (
          SELECT CASE
            WHEN userId = ? THEN friendId
            ELSE userId
          END
          FROM friends
          WHERE (userId = ? OR friendId = ?) AND status != 'rejected'
        )
      LIMIT 10
    `).all(
      req.user.id,
      `%${q}%`,
      parseInt(q) || 0,
      req.user.id,
      req.user.id,
      req.user.id
    );

    res.json(users);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/:id', auth, (req, res) => {
  try {
    const user = db.prepare(`
      SELECT 
        u.id, u.username, u.vipLevel,
        (
          SELECT COUNT(*)
          FROM friends f
          WHERE (f.userId = u.id OR f.friendId = u.id) AND f.status = 'accepted'
        ) as friendCount,
        (
          SELECT COUNT(*)
          FROM game_scores gs
          WHERE gs.userId = u.id
        ) as gamesPlayed
      FROM users u
      WHERE u.id = ?
    `).get(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
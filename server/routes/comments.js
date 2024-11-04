import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get game comments
router.get('/games/:id', auth, (req, res) => {
  try {
    const comments = db.prepare(`
      SELECT 
        c.*,
        u.username,
        u.vipLevel
      FROM game_comments c
      JOIN users u ON c.userId = u.id
      WHERE c.gameId = ?
      ORDER BY c.createdAt DESC
      LIMIT 50
    `).all(req.params.id);

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/games/:id', auth, (req, res) => {
  try {
    const { content, rating } = req.body;
    const gameId = req.params.id;

    // Check if user has played the game
    const hasPlayed = db.prepare(`
      SELECT COUNT(*) as count
      FROM game_scores
      WHERE userId = ? AND gameId = ?
    `).get(req.user.id, gameId).count > 0;

    if (!hasPlayed) {
      return res.status(400).json({ message: 'Must play game before commenting' });
    }

    const result = db.prepare(`
      INSERT INTO game_comments (userId, gameId, content, rating)
      VALUES (?, ?, ?, ?)
    `).run(req.user.id, gameId, content, rating);

    const comment = db.prepare(`
      SELECT 
        c.*,
        u.username,
        u.vipLevel
      FROM game_comments c
      JOIN users u ON c.userId = u.id
      WHERE c.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(comment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
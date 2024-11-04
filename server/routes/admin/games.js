import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get all games with stats
router.get('/', adminAuth, (req, res) => {
  try {
    const games = db.prepare(`
      SELECT 
        g.*,
        (
          SELECT COUNT(DISTINCT userId)
          FROM game_scores
          WHERE gameId = g.id
        ) as players,
        (
          SELECT COUNT(*)
          FROM game_scores
          WHERE gameId = g.id
        ) as totalPlays,
        (
          SELECT MAX(score)
          FROM game_scores
          WHERE gameId = g.id
        ) as highScore
      FROM games g
      ORDER BY createdAt DESC
    `).all();

    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new game
router.post('/', adminAuth, (req, res) => {
  try {
    const { name, description, category, imageUrl, pointsPerPlay } = req.body;

    const result = db.prepare(`
      INSERT INTO games (name, description, category, imageUrl, pointsPerPlay)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, description, category, imageUrl, pointsPerPlay);

    const game = db.prepare('SELECT * FROM games WHERE id = ?')
      .get(result.lastInsertRowid);

    res.status(201).json(game);
  } catch (error) {
    console.error('Add game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update game
router.put('/:id', adminAuth, (req, res) => {
  try {
    const { name, description, category, imageUrl, pointsPerPlay, status } = req.body;

    db.prepare(`
      UPDATE games
      SET name = ?,
          description = ?,
          category = ?,
          imageUrl = ?,
          pointsPerPlay = ?,
          status = ?
      WHERE id = ?
    `).run(name, description, category, imageUrl, pointsPerPlay, status, req.params.id);

    const game = db.prepare('SELECT * FROM games WHERE id = ?')
      .get(req.params.id);

    res.json(game);
  } catch (error) {
    console.error('Update game error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get game statistics
router.get('/:id/stats', adminAuth, (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT 
        COUNT(DISTINCT userId) as uniquePlayers,
        COUNT(*) as totalPlays,
        AVG(score) as averageScore,
        MAX(score) as highScore,
        MIN(score) as lowScore
      FROM game_scores
      WHERE gameId = ?
    `).get(req.params.id);

    // Get daily play counts
    const dailyStats = db.prepare(`
      SELECT 
        DATE(createdAt) as date,
        COUNT(*) as plays,
        COUNT(DISTINCT userId) as players
      FROM game_scores
      WHERE gameId = ?
      GROUP BY DATE(createdAt)
      ORDER BY date DESC
      LIMIT 30
    `).all(req.params.id);

    res.json({
      overall: stats,
      daily: dailyStats
    });
  } catch (error) {
    console.error('Get game stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
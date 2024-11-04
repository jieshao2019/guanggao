import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get game progress
router.get('/:id/progress', auth, (req, res) => {
  try {
    // Get progress
    const progress = db.prepare(`
      SELECT level, experience
      FROM game_progress
      WHERE userId = ? AND gameId = ?
    `).get(req.user.id, req.params.id) || { level: 1, experience: 0 };

    // Get stats
    const stats = db.prepare(`
      SELECT totalPlays, totalScore, highScore, playTime
      FROM game_stats
      WHERE userId = ? AND gameId = ?
    `).get(req.user.id, req.params.id) || {
      totalPlays: 0,
      totalScore: 0,
      highScore: 0,
      playTime: 0,
    };

    // Get active buffs
    const buffs = db.prepare(`
      SELECT id, multiplier, expiresAt
      FROM game_buffs
      WHERE userId = ? AND gameId = ? AND expiresAt > datetime('now')
    `).all(req.user.id, req.params.id);

    res.json({
      ...progress,
      stats,
      buffs,
    });
  } catch (error) {
    console.error('Get game progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update game progress
router.put('/:id/progress', auth, (req, res) => {
  try {
    const { experience, playTime } = req.body;
    const gameId = req.params.id;

    // Start transaction
    db.transaction(() => {
      // Get current progress
      let progress = db.prepare(`
        SELECT * FROM game_progress
        WHERE userId = ? AND gameId = ?
      `).get(req.user.id, gameId);

      if (progress) {
        // Update existing progress
        db.prepare(`
          UPDATE game_progress
          SET experience = experience + ?,
              lastPlayedAt = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(experience, progress.id);
      } else {
        // Create new progress
        db.prepare(`
          INSERT INTO game_progress (userId, gameId, level, experience)
          VALUES (?, ?, 1, ?)
        `).run(req.user.id, gameId, experience);
      }

      // Update stats
      let stats = db.prepare(`
        SELECT * FROM game_stats
        WHERE userId = ? AND gameId = ?
      `).get(req.user.id, gameId);

      if (stats) {
        db.prepare(`
          UPDATE game_stats
          SET totalPlays = totalPlays + 1,
              playTime = playTime + ?
          WHERE id = ?
        `).run(playTime, stats.id);
      } else {
        db.prepare(`
          INSERT INTO game_stats (userId, gameId, totalPlays, playTime)
          VALUES (?, ?, 1, ?)
        `).run(req.user.id, gameId, playTime);
      }
    })();

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update game progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ... rest of the code remains unchanged
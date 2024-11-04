import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get game leaderboard
router.get('/games/:id', auth, (req, res) => {
  try {
    const { period = 'all' } = req.query;
    const gameId = req.params.id;

    let dateFilter = '';
    switch (period) {
      case 'daily':
        dateFilter = 'AND DATE(gs.createdAt) = DATE("now")';
        break;
      case 'weekly':
        dateFilter = 'AND gs.createdAt >= datetime("now", "-7 days")';
        break;
      case 'monthly':
        dateFilter = 'AND gs.createdAt >= datetime("now", "-30 days")';
        break;
    }

    // Get leaderboard
    const leaderboard = db.prepare(`
      WITH RankedScores AS (
        SELECT 
          gs.userId,
          u.username,
          u.vipLevel,
          MAX(gs.score) as highScore,
          COUNT(*) as gamesPlayed,
          ROW_NUMBER() OVER (ORDER BY MAX(gs.score) DESC) as rank
        FROM game_scores gs
        JOIN users u ON gs.userId = u.id
        WHERE gs.gameId = ? ${dateFilter}
        GROUP BY gs.userId
      )
      SELECT *
      FROM RankedScores
      ORDER BY rank
      LIMIT 100
    `).all(gameId);

    // Get user's rank
    const userRank = db.prepare(`
      WITH RankedScores AS (
        SELECT 
          userId,
          MAX(score) as highScore,
          ROW_NUMBER() OVER (ORDER BY MAX(score) DESC) as rank
        FROM game_scores
        WHERE gameId = ? ${dateFilter}
        GROUP BY userId
      )
      SELECT *
      FROM RankedScores
      WHERE userId = ?
    `).get(gameId, req.user.id);

    res.json({
      leaderboard,
      userRank: userRank || { rank: null, highScore: 0 }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user rankings
router.get('/users/:id', auth, (req, res) => {
  try {
    const userId = req.params.id;

    // Get user's rankings across all games
    const rankings = db.prepare(`
      WITH RankedScores AS (
        SELECT 
          gs.gameId,
          g.name as gameName,
          MAX(gs.score) as highScore,
          COUNT(*) as gamesPlayed,
          ROW_NUMBER() OVER (PARTITION BY gs.gameId ORDER BY MAX(gs.score) DESC) as rank
        FROM game_scores gs
        JOIN games g ON gs.gameId = g.id
        GROUP BY gs.gameId, gs.userId
      )
      SELECT *
      FROM RankedScores
      WHERE userId = ?
      ORDER BY rank
    `).all(userId);

    res.json(rankings);
  } catch (error) {
    console.error('Get user rankings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get global rankings
router.get('/global', auth, (req, res) => {
  try {
    const { period = 'all' } = req.query;

    let dateFilter = '';
    switch (period) {
      case 'daily':
        dateFilter = 'AND DATE(gs.createdAt) = DATE("now")';
        break;
      case 'weekly':
        dateFilter = 'AND gs.createdAt >= datetime("now", "-7 days")';
        break;
      case 'monthly':
        dateFilter = 'AND gs.createdAt >= datetime("now", "-30 days")';
        break;
    }

    // Get global rankings
    const rankings = db.prepare(`
      WITH UserScores AS (
        SELECT 
          u.id,
          u.username,
          u.vipLevel,
          COUNT(DISTINCT gs.gameId) as gamesPlayed,
          SUM(gs.score) as totalScore,
          COUNT(*) as totalPlays
        FROM users u
        LEFT JOIN game_scores gs ON u.id = gs.userId ${dateFilter}
        GROUP BY u.id
      )
      SELECT *,
        ROW_NUMBER() OVER (ORDER BY totalScore DESC) as rank
      FROM UserScores
      ORDER BY rank
      LIMIT 100
    `).all();

    res.json(rankings);
  } catch (error) {
    console.error('Get global rankings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
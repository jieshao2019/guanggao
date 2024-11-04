import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get user statistics
router.get('/users', adminAuth, (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const stats = db.prepare(`
      SELECT 
        DATE(createdAt) as date,
        COUNT(*) as newUsers,
        COUNT(CASE WHEN vipLevel > 0 THEN 1 END) as newVipUsers
      FROM users
      WHERE createdAt >= DATE('now', ?)
      GROUP BY DATE(createdAt)
      ORDER BY date
    `).all(`-${period}`);

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get revenue statistics
router.get('/revenue', adminAuth, (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const stats = db.prepare(`
      SELECT 
        DATE(createdAt) as date,
        SUM(amount) as revenue,
        COUNT(*) as transactions
      FROM transactions
      WHERE status = 'completed'
      AND createdAt >= DATE('now', ?)
      GROUP BY DATE(createdAt)
      ORDER BY date
    `).all(`-${period}`);

    res.json(stats);
  } catch (error) {
    console.error('Get revenue stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get game statistics
router.get('/games', adminAuth, (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const stats = db.prepare(`
      SELECT 
        DATE(createdAt) as date,
        COUNT(*) as plays,
        COUNT(DISTINCT userId) as players,
        AVG(score) as averageScore
      FROM game_scores
      WHERE createdAt >= DATE('now', ?)
      GROUP BY DATE(createdAt)
      ORDER BY date
    `).all(`-${period}`);

    res.json(stats);
  } catch (error) {
    console.error('Get game stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get ad statistics
router.get('/ads', adminAuth, (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    const stats = db.prepare(`
      SELECT 
        DATE(completedAt) as date,
        COUNT(*) as views,
        COUNT(DISTINCT userId) as viewers,
        SUM(points) as totalPoints
      FROM ad_views
      WHERE completedAt >= DATE('now', ?)
      GROUP BY DATE(completedAt)
      ORDER BY date
    `).all(`-${period}`);

    res.json(stats);
  } catch (error) {
    console.error('Get ad stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get ad statistics
router.get('/stats', adminAuth, (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as totalViews,
        COUNT(DISTINCT userId) as uniqueViewers,
        SUM(points) as totalPoints,
        AVG(points) as averagePoints
      FROM ad_views
    `).get();

    // Get daily stats
    const dailyStats = db.prepare(`
      SELECT 
        DATE(completedAt) as date,
        COUNT(*) as views,
        COUNT(DISTINCT userId) as viewers,
        SUM(points) as points
      FROM ad_views
      GROUP BY DATE(completedAt)
      ORDER BY date DESC
      LIMIT 30
    `).all();

    res.json({
      overall: stats,
      daily: dailyStats
    });
  } catch (error) {
    console.error('Get ad stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user ad views
router.get('/users/:id', adminAuth, (req, res) => {
  try {
    const views = db.prepare(`
      SELECT *
      FROM ad_views
      WHERE userId = ?
      ORDER BY completedAt DESC
      LIMIT 50
    `).all(req.params.id);

    res.json(views);
  } catch (error) {
    console.error('Get user ad views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', adminAuth, (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's statistics
    const todayStats = db.prepare(`
      SELECT * FROM daily_statistics
      WHERE date = ?
    `).get(today);

    // Get user statistics
    const userStats = db.prepare(`
      SELECT 
        COUNT(*) as totalUsers,
        COUNT(CASE WHEN DATE(createdAt) = ? THEN 1 END) as newUsers,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as activeUsers,
        COUNT(CASE WHEN vipLevel > 0 THEN 1 END) as vipUsers
      FROM users
    `).get(today);

    // Get revenue statistics
    const revenueStats = db.prepare(`
      SELECT 
        SUM(amount) as totalRevenue,
        COUNT(*) as totalTransactions
      FROM transactions
      WHERE status = 'completed'
      AND DATE(createdAt) = ?
    `).get(today);

    // Get game statistics
    const gameStats = db.prepare(`
      SELECT 
        COUNT(*) as totalGames,
        COUNT(CASE WHEN DATE(createdAt) = ? THEN 1 END) as gamesPlayed
      FROM game_scores
    `).get(today);

    // Get ad statistics
    const adStats = db.prepare(`
      SELECT 
        COUNT(*) as totalViews,
        SUM(points) as totalPoints
      FROM ad_views
      WHERE DATE(completedAt) = ?
    `).get(today);

    res.json({
      users: userStats,
      revenue: revenueStats,
      games: gameStats,
      ads: adStats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent activities
router.get('/activities', adminAuth, (req, res) => {
  try {
    const activities = db.prepare(`
      SELECT 
        ua.*,
        u.username
      FROM user_activities ua
      JOIN users u ON ua.userId = u.id
      ORDER BY ua.createdAt DESC
      LIMIT 50
    `).all();

    res.json(activities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get system status
router.get('/system', adminAuth, (req, res) => {
  try {
    // Get system settings
    const settings = db.prepare(`
      SELECT * FROM system_settings
    `).all();

    // Get error logs
    const errors = db.prepare(`
      SELECT * FROM error_logs
      ORDER BY createdAt DESC
      LIMIT 10
    `).all();

    res.json({
      settings,
      errors
    });
  } catch (error) {
    console.error('Get system status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
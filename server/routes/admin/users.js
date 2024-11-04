import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get all users with pagination
router.get('/', adminAuth, (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const users = db.prepare(`
      SELECT 
        id, username, email, vipLevel, points, balance, status,
        createdAt, dailyAdViews,
        (
          SELECT COUNT(*) 
          FROM game_scores 
          WHERE userId = users.id
        ) as gamesPlayed
      FROM users
      WHERE username LIKE ? OR email LIKE ?
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `).all(`%${search}%`, `%${search}%`, limit, offset);

    const total = db.prepare(`
      SELECT COUNT(*) as count
      FROM users
      WHERE username LIKE ? OR email LIKE ?
    `).get(`%${search}%`, `%${search}%`).count;

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user status
router.put('/:id/status', adminAuth, (req, res) => {
  try {
    const { status } = req.body;

    db.prepare(`
      UPDATE users
      SET status = ?
      WHERE id = ?
    `).run(status, req.params.id);

    res.json({ message: 'User status updated' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user details
router.get('/:id', adminAuth, (req, res) => {
  try {
    const user = db.prepare(`
      SELECT 
        u.*,
        (
          SELECT COUNT(*) 
          FROM game_scores 
          WHERE userId = u.id
        ) as gamesPlayed,
        (
          SELECT COUNT(*) 
          FROM ad_views 
          WHERE userId = u.id
        ) as adsWatched
      FROM users u
      WHERE u.id = ?
    `).get(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get recent activities
    const activities = db.prepare(`
      SELECT 
        'game' as type,
        g.name as title,
        gs.score,
        gs.createdAt
      FROM game_scores gs
      JOIN games g ON gs.gameId = g.id
      WHERE gs.userId = ?
      
      UNION ALL
      
      SELECT 
        'ad' as type,
        'Watched ad' as title,
        av.points as score,
        av.completedAt as createdAt
      FROM ad_views av
      WHERE av.userId = ?
      
      ORDER BY createdAt DESC
      LIMIT 10
    `).all(req.params.id, req.params.id);

    res.json({
      ...user,
      activities
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get user's ad views
router.get('/views', auth, (req, res) => {
  try {
    const views = db.prepare(`
      SELECT * FROM ad_views
      WHERE userId = ?
      ORDER BY completedAt DESC
    `).all(req.user.id);

    res.json(views);
  } catch (error) {
    console.error('Get ad views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete ad view
router.post('/complete', auth, (req, res) => {
  try {
    const { duration } = req.body;
    const points = Math.floor(duration / 30) * 30; // 30 points per 30 seconds

    // Start transaction
    db.transaction(() => {
      // Add ad view record
      db.prepare(`
        INSERT INTO ad_views (userId, points, duration)
        VALUES (?, ?, ?)
      `).run(req.user.id, points, duration);

      // Update user points and daily views
      db.prepare(`
        UPDATE users
        SET points = points + ?,
            dailyAdViews = dailyAdViews + 1
        WHERE id = ?
      `).run(points, req.user.id);
    })();

    res.json({ points });
  } catch (error) {
    console.error('Complete ad error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset daily ad views (should be called by a cron job)
router.post('/reset-daily-views', async (req, res) => {
  try {
    db.prepare(`
      UPDATE users
      SET dailyAdViews = 0,
          lastAdViewReset = CURRENT_TIMESTAMP
      WHERE DATE(lastAdViewReset) < DATE('now')
    `).run();

    res.json({ message: 'Daily views reset successful' });
  } catch (error) {
    console.error('Reset daily views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get sign in status
router.get('/status', auth, (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const record = db.prepare(`
      SELECT * FROM sign_in_records
      WHERE userId = ? AND DATE(createdAt) = ?
    `).get(req.user.id, today);

    // Get consecutive days
    const consecutiveDays = db.prepare(`
      WITH RECURSIVE dates(date) AS (
        SELECT DATE(createdAt)
        FROM sign_in_records
        WHERE userId = ?
        ORDER BY createdAt DESC
        LIMIT 1
        
        UNION ALL
        
        SELECT DATE(date, '-1 day')
        FROM dates
        WHERE EXISTS (
          SELECT 1
          FROM sign_in_records
          WHERE userId = ?
          AND DATE(createdAt) = DATE(date, '-1 day')
        )
      )
      SELECT COUNT(*) as days FROM dates
    `).get(req.user.id, req.user.id);

    res.json({
      signedIn: !!record,
      consecutiveDays: consecutiveDays.days
    });
  } catch (error) {
    console.error('Get sign in status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign in
router.post('/', auth, (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already signed in today
    const existing = db.prepare(`
      SELECT * FROM sign_in_records
      WHERE userId = ? AND DATE(createdAt) = ?
    `).get(req.user.id, today);

    if (existing) {
      return res.status(400).json({ message: 'Already signed in today' });
    }

    // Get consecutive days
    const consecutiveDays = db.prepare(`
      WITH RECURSIVE dates(date) AS (
        SELECT DATE(createdAt)
        FROM sign_in_records
        WHERE userId = ?
        ORDER BY createdAt DESC
        LIMIT 1
        
        UNION ALL
        
        SELECT DATE(date, '-1 day')
        FROM dates
        WHERE EXISTS (
          SELECT 1
          FROM sign_in_records
          WHERE userId = ?
          AND DATE(createdAt) = DATE(date, '-1 day')
        )
      )
      SELECT COUNT(*) as days FROM dates
    `).get(req.user.id, req.user.id);

    const day = consecutiveDays.days + 1;
    const points = Math.min(day * 10, 70); // Max 70 points for 7 days

    // Start transaction
    db.transaction(() => {
      // Create sign in record
      db.prepare(`
        INSERT INTO sign_in_records (userId, points, day)
        VALUES (?, ?, ?)
      `).run(req.user.id, points, day);

      // Update user points
      db.prepare(`
        UPDATE users
        SET points = points + ?
        WHERE id = ?
      `).run(points, req.user.id);

      // Create notification
      db.prepare(`
        INSERT INTO notifications (userId, type, title, content)
        VALUES (?, 'sign_in', '签到成功', '连续签到 ? 天，获得 ? 积分')
      `).run(req.user.id, day, points);
    })();

    res.json({
      points,
      day,
      consecutiveDays: day
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
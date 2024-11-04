import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get all reports
router.get('/', adminAuth, (req, res) => {
  try {
    const { status = 'all', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const reports = db.prepare(`
      SELECT 
        r.*,
        u1.username as reporterName,
        u2.username as reportedName
      FROM user_reports r
      JOIN users u1 ON r.reporterId = u1.id
      JOIN users u2 ON r.reportedId = u2.id
      ${status !== 'all' ? "WHERE r.status = ?" : ""}
      ORDER BY r.createdAt DESC
      LIMIT ? OFFSET ?
    `).all(...(status !== 'all' ? [status, limit, offset] : [limit, offset]));

    const total = db.prepare(`
      SELECT COUNT(*) as count
      FROM user_reports
      ${status !== 'all' ? "WHERE status = ?" : ""}
    `).get(...(status !== 'all' ? [status] : [])).count;

    res.json({
      reports,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle report
router.put('/:id', adminAuth, (req, res) => {
  try {
    const { status, action } = req.body;

    // Start transaction
    db.transaction(() => {
      // Update report status
      db.prepare(`
        UPDATE user_reports
        SET status = ?
        WHERE id = ?
      `).run(status, req.params.id);

      if (action === 'ban') {
        const report = db.prepare(`
          SELECT reportedId FROM user_reports WHERE id = ?
        `).get(req.params.id);

        // Ban reported user
        db.prepare(`
          UPDATE users
          SET status = 'banned'
          WHERE id = ?
        `).run(report.reportedId);
      }
    })();

    res.json({ message: 'Report handled successfully' });
  } catch (error) {
    console.error('Handle report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
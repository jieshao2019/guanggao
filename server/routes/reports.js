import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Report user
router.post('/users/:id', auth, (req, res) => {
  try {
    const { type, content } = req.body;
    const reportedId = req.params.id;

    // Check if already reported
    const existing = db.prepare(`
      SELECT * FROM user_reports
      WHERE reporterId = ? AND reportedId = ?
      AND createdAt > datetime('now', '-24 hours')
    `).get(req.user.id, reportedId);

    if (existing) {
      return res.status(400).json({ message: 'Already reported in last 24 hours' });
    }

    // Create report
    db.prepare(`
      INSERT INTO user_reports (reporterId, reportedId, type, content)
      VALUES (?, ?, ?, ?)
    `).run(req.user.id, reportedId, type, content);

    res.json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Report user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user reports
router.get('/users', auth, (req, res) => {
  try {
    const reports = db.prepare(`
      SELECT 
        r.*,
        u1.username as reporterName,
        u2.username as reportedName
      FROM user_reports r
      JOIN users u1 ON r.reporterId = u1.id
      JOIN users u2 ON r.reportedId = u2.id
      WHERE r.reporterId = ?
      ORDER BY r.createdAt DESC
    `).all(req.user.id);

    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
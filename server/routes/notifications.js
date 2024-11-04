import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get user notifications
router.get('/', auth, (req, res) => {
  try {
    const notifications = db.prepare(`
      SELECT * FROM notifications
      WHERE userId = ?
      ORDER BY createdAt DESC
      LIMIT 50
    `).all(req.user.id);

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.put('/:id/read', auth, (req, res) => {
  try {
    db.prepare(`
      UPDATE notifications
      SET read = 1
      WHERE id = ? AND userId = ?
    `).run(req.params.id, req.user.id);

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark all notifications as read
router.put('/read-all', auth, (req, res) => {
  try {
    db.prepare(`
      UPDATE notifications
      SET read = 1
      WHERE userId = ?
    `).run(req.user.id);

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete notification
router.delete('/:id', auth, (req, res) => {
  try {
    db.prepare(`
      DELETE FROM notifications
      WHERE id = ? AND userId = ?
    `).run(req.params.id, req.user.id);

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
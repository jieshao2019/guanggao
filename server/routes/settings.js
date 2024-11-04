import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get user settings
router.get('/', auth, (req, res) => {
  try {
    let settings = db.prepare(`
      SELECT * FROM user_settings
      WHERE userId = ?
    `).get(req.user.id);

    if (!settings) {
      // Create default settings if not exists
      const result = db.prepare(`
        INSERT INTO user_settings (userId)
        VALUES (?)
      `).run(req.user.id);

      settings = db.prepare(`
        SELECT * FROM user_settings
        WHERE id = ?
      `).get(result.lastInsertRowid);
    }

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update settings
router.put('/', auth, (req, res) => {
  try {
    const { soundEnabled, musicEnabled, notificationsEnabled, language } = req.body;

    db.prepare(`
      UPDATE user_settings
      SET soundEnabled = ?,
          musicEnabled = ?,
          notificationsEnabled = ?,
          language = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE userId = ?
    `).run(
      soundEnabled,
      musicEnabled,
      notificationsEnabled,
      language,
      req.user.id
    );

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
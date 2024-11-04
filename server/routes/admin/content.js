import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get announcements
router.get('/announcements', adminAuth, (req, res) => {
  try {
    const announcements = db.prepare(`
      SELECT * FROM announcements
      ORDER BY createdAt DESC
    `).all();

    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create announcement
router.post('/announcements', adminAuth, (req, res) => {
  try {
    const { title, content, type, startDate, endDate } = req.body;

    const result = db.prepare(`
      INSERT INTO announcements (title, content, type, startDate, endDate)
      VALUES (?, ?, ?, ?, ?)
    `).run(title, content, type, startDate, endDate);

    const announcement = db.prepare(`
      SELECT * FROM announcements WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(announcement);
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get help articles
router.get('/help', adminAuth, (req, res) => {
  try {
    const articles = db.prepare(`
      SELECT * FROM help_articles
      ORDER BY createdAt DESC
    `).all();

    res.json(articles);
  } catch (error) {
    console.error('Get help articles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create help article
router.post('/help', adminAuth, (req, res) => {
  try {
    const { title, content, category } = req.body;

    const result = db.prepare(`
      INSERT INTO help_articles (title, content, category)
      VALUES (?, ?, ?)
    `).run(title, content, category);

    const article = db.prepare(`
      SELECT * FROM help_articles WHERE id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(article);
  } catch (error) {
    console.error('Create help article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Submit feedback
router.post('/', auth, upload.array('images', 4), (req, res) => {
  try {
    const { type, content } = req.body;
    const images = req.files;

    // Start transaction
    db.transaction(() => {
      // Create feedback record
      const result = db.prepare(`
        INSERT INTO feedback (userId, type, content)
        VALUES (?, ?, ?)
      `).run(req.user.id, type, content);

      // Save images if any
      if (images?.length) {
        const stmt = db.prepare(`
          INSERT INTO feedback_images (feedbackId, imageUrl)
          VALUES (?, ?)
        `);

        images.forEach(image => {
          stmt.run(result.lastInsertRowid, image.path);
        });
      }

      // Create notification for admins
      db.prepare(`
        INSERT INTO notifications (userId, type, title, content)
        VALUES (?, 'feedback', '新的反馈', ?)
      `).run(1, `用户 ${req.user.username} 提交了新的反馈`);
    })();

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user feedback history
router.get('/', auth, (req, res) => {
  try {
    const feedback = db.prepare(`
      SELECT 
        f.*,
        GROUP_CONCAT(fi.imageUrl) as images
      FROM feedback f
      LEFT JOIN feedback_images fi ON f.id = fi.feedbackId
      WHERE f.userId = ?
      GROUP BY f.id
      ORDER BY f.createdAt DESC
    `).all(req.user.id);

    res.json(feedback.map(f => ({
      ...f,
      images: f.images ? f.images.split(',') : []
    })));
  } catch (error) {
    console.error('Get feedback history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get conversations
router.get('/', auth, (req, res) => {
  try {
    const conversations = db.prepare(`
      SELECT 
        m.*,
        u.username as senderName,
        u.id as senderId
      FROM messages m
      JOIN users u ON m.senderId = u.id
      WHERE 
        m.id IN (
          SELECT MAX(id)
          FROM messages
          WHERE senderId = ? OR receiverId = ?
          GROUP BY 
            CASE 
              WHEN senderId = ? THEN receiverId 
              ELSE senderId 
            END
        )
      ORDER BY m.createdAt DESC
    `).all(req.user.id, req.user.id, req.user.id);

    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages with a specific user
router.get('/:userId', auth, (req, res) => {
  try {
    const messages = db.prepare(`
      SELECT m.*, u.username as senderName
      FROM messages m
      JOIN users u ON m.senderId = u.id
      WHERE 
        (senderId = ? AND receiverId = ?) OR
        (senderId = ? AND receiverId = ?)
      ORDER BY createdAt DESC
      LIMIT 50
    `).all(req.user.id, req.params.userId, req.params.userId, req.user.id);

    // Mark messages as read
    db.prepare(`
      UPDATE messages
      SET read = 1
      WHERE receiverId = ? AND senderId = ? AND read = 0
    `).run(req.user.id, req.params.userId);

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:userId', auth, (req, res) => {
  try {
    const { content } = req.body;
    const receiverId = parseInt(req.params.userId);

    const result = db.prepare(`
      INSERT INTO messages (senderId, receiverId, content)
      VALUES (?, ?, ?)
    `).run(req.user.id, receiverId, content);

    const message = db.prepare(`
      SELECT m.*, u.username as senderName
      FROM messages m
      JOIN users u ON m.senderId = u.id
      WHERE m.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
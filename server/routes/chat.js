import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get chat rooms
router.get('/rooms', auth, (req, res) => {
  try {
    const rooms = db.prepare(`
      SELECT 
        r.*,
        COUNT(DISTINCT m.userId) as memberCount,
        (
          SELECT COUNT(*)
          FROM chat_messages cm
          WHERE cm.roomId = r.id
        ) as messageCount
      FROM chat_rooms r
      JOIN chat_room_members m ON r.id = m.roomId
      WHERE r.id IN (
        SELECT roomId
        FROM chat_room_members
        WHERE userId = ?
      )
      GROUP BY r.id
      ORDER BY r.createdAt DESC
    `).all(req.user.id);

    res.json(rooms);
  } catch (error) {
    console.error('Get chat rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create chat room
router.post('/rooms', auth, (req, res) => {
  try {
    const { name, members } = req.body;

    // Start transaction
    db.transaction(() => {
      // Create room
      const result = db.prepare(`
        INSERT INTO chat_rooms (name)
        VALUES (?)
      `).run(name);

      const roomId = result.lastInsertRowid;

      // Add creator as admin
      db.prepare(`
        INSERT INTO chat_room_members (roomId, userId, role)
        VALUES (?, ?, 'admin')
      `).run(roomId, req.user.id);

      // Add members
      const stmt = db.prepare(`
        INSERT INTO chat_room_members (roomId, userId)
        VALUES (?, ?)
      `);

      members.forEach(memberId => {
        stmt.run(roomId, memberId);
      });
    })();

    res.status(201).json({ message: 'Chat room created successfully' });
  } catch (error) {
    console.error('Create chat room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room messages
router.get('/rooms/:id/messages', auth, (req, res) => {
  try {
    // Check if user is member
    const isMember = db.prepare(`
      SELECT 1 FROM chat_room_members
      WHERE roomId = ? AND userId = ?
    `).get(req.params.id, req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: 'Not a member of this room' });
    }

    const messages = db.prepare(`
      SELECT 
        m.*,
        u.username,
        u.avatar
      FROM chat_messages m
      JOIN users u ON m.userId = u.id
      WHERE m.roomId = ?
      ORDER BY m.createdAt DESC
      LIMIT 50
    `).all(req.params.id);

    res.json(messages);
  } catch (error) {
    console.error('Get room messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/rooms/:id/messages', auth, (req, res) => {
  try {
    const { content, type = 'text' } = req.body;

    // Check if user is member
    const isMember = db.prepare(`
      SELECT 1 FROM chat_room_members
      WHERE roomId = ? AND userId = ?
    `).get(req.params.id, req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: 'Not a member of this room' });
    }

    const result = db.prepare(`
      INSERT INTO chat_messages (roomId, userId, content, type)
      VALUES (?, ?, ?, ?)
    `).run(req.params.id, req.user.id, content, type);

    const message = db.prepare(`
      SELECT 
        m.*,
        u.username,
        u.avatar
      FROM chat_messages m
      JOIN users u ON m.userId = u.id
      WHERE m.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
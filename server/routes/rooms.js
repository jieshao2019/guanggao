import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get game rooms
router.get('/:gameId/rooms', auth, (req, res) => {
  try {
    const rooms = db.prepare(`
      SELECT 
        r.*,
        COUNT(rp.id) as playerCount,
        (
          SELECT COUNT(*) 
          FROM room_messages 
          WHERE roomId = r.id
        ) as messageCount
      FROM game_rooms r
      LEFT JOIN room_players rp ON r.id = rp.roomId
      WHERE r.gameId = ? AND r.status != 'closed'
      GROUP BY r.id
      HAVING playerCount < r.maxPlayers
      ORDER BY r.createdAt DESC
    `).all(req.params.gameId);

    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create room
router.post('/:gameId/rooms', auth, (req, res) => {
  try {
    const { name, maxPlayers = 4 } = req.body;
    const gameId = req.params.gameId;

    // Start transaction
    db.transaction(() => {
      // Create room
      const result = db.prepare(`
        INSERT INTO game_rooms (gameId, name, maxPlayers)
        VALUES (?, ?, ?)
      `).run(gameId, name, maxPlayers);

      // Add creator as first player
      db.prepare(`
        INSERT INTO room_players (roomId, userId, status)
        VALUES (?, ?, 'host')
      `).run(result.lastInsertRowid, req.user.id);

      const room = db.prepare(`
        SELECT 
          r.*,
          1 as playerCount,
          0 as messageCount
        FROM game_rooms r
        WHERE r.id = ?
      `).get(result.lastInsertRowid);

      res.status(201).json(room);
    })();
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room details
router.get('/:id', auth, (req, res) => {
  try {
    const room = db.prepare(`
      SELECT 
        r.*,
        g.name as gameName,
        g.imageUrl as gameImage,
        COUNT(rp.id) as playerCount
      FROM game_rooms r
      JOIN games g ON r.gameId = g.id
      LEFT JOIN room_players rp ON r.id = rp.roomId
      WHERE r.id = ?
      GROUP BY r.id
    `).get(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Get players
    const players = db.prepare(`
      SELECT 
        u.id,
        u.username,
        u.vipLevel,
        rp.status,
        rp.joinedAt
      FROM room_players rp
      JOIN users u ON rp.userId = u.id
      WHERE rp.roomId = ?
      ORDER BY rp.joinedAt
    `).all(req.params.id);

    // Get recent messages
    const messages = db.prepare(`
      SELECT 
        m.*,
        u.username
      FROM room_messages m
      JOIN users u ON m.userId = u.id
      WHERE m.roomId = ?
      ORDER BY m.createdAt DESC
      LIMIT 50
    `).all(req.params.id);

    res.json({
      ...room,
      players,
      messages: messages.reverse()
    });
  } catch (error) {
    console.error('Get room details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join room
router.post('/:id/join', auth, (req, res) => {
  try {
    const roomId = req.params.id;

    // Check if room exists and has space
    const room = db.prepare(`
      SELECT 
        r.*,
        COUNT(rp.id) as playerCount
      FROM game_rooms r
      LEFT JOIN room_players rp ON r.id = rp.roomId
      WHERE r.id = ? AND r.status != 'closed'
      GROUP BY r.id
    `).get(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.playerCount >= room.maxPlayers) {
      return res.status(400).json({ message: 'Room is full' });
    }

    // Check if already in room
    const existingPlayer = db.prepare(`
      SELECT * FROM room_players
      WHERE roomId = ? AND userId = ?
    `).get(roomId, req.user.id);

    if (existingPlayer) {
      return res.status(400).json({ message: 'Already in room' });
    }

    // Add player
    db.prepare(`
      INSERT INTO room_players (roomId, userId)
      VALUES (?, ?)
    `).run(roomId, req.user.id);

    res.json({ message: 'Joined room successfully' });
  } catch (error) {
    console.error('Join room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave room
router.post('/:id/leave', auth, (req, res) => {
  try {
    const roomId = req.params.id;

    // Start transaction
    db.transaction(() => {
      // Remove player
      db.prepare(`
        DELETE FROM room_players
        WHERE roomId = ? AND userId = ?
      `).run(roomId, req.user.id);

      // Check remaining players
      const remainingPlayers = db.prepare(`
        SELECT * FROM room_players
        WHERE roomId = ?
        ORDER BY joinedAt
      `).all(roomId);

      if (remainingPlayers.length === 0) {
        // Close empty room
        db.prepare(`
          UPDATE game_rooms
          SET status = 'closed'
          WHERE id = ?
        `).run(roomId);
      } else {
        // Update host if needed
        const oldHost = remainingPlayers.find(p => p.status === 'host');
        if (!oldHost) {
          db.prepare(`
            UPDATE room_players
            SET status = 'host'
            WHERE id = ?
          `).run(remainingPlayers[0].id);
        }
      }
    })();

    res.json({ message: 'Left room successfully' });
  } catch (error) {
    console.error('Leave room error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:id/messages', auth, (req, res) => {
  try {
    const { content } = req.body;
    const roomId = req.params.id;

    // Check if in room
    const player = db.prepare(`
      SELECT * FROM room_players
      WHERE roomId = ? AND userId = ?
    `).get(roomId, req.user.id);

    if (!player) {
      return res.status(403).json({ message: 'Not in room' });
    }

    // Add message
    const result = db.prepare(`
      INSERT INTO room_messages (roomId, userId, content)
      VALUES (?, ?, ?)
    `).run(roomId, req.user.id, content);

    const message = db.prepare(`
      SELECT 
        m.*,
        u.username
      FROM room_messages m
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
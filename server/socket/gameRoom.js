import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import db from '../db/index.js';

export default function initGameRoomSocket(io) {
  const gameNamespace = io.of('/game');

  // Authentication middleware
  gameNamespace.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  // Connection handler
  gameNamespace.on('connection', (socket) => {
    console.log('Game socket connected:', socket.user.id);

    // Join room
    socket.on('join-room', async (roomId) => {
      try {
        // Get room info
        const room = db.prepare(`
          SELECT * FROM game_rooms WHERE id = ?
        `).get(roomId);

        if (!room) {
          socket.emit('error', { message: 'Room not found' });
          return;
        }

        // Join socket room
        socket.join(`room:${roomId}`);
        
        // Notify others
        socket.to(`room:${roomId}`).emit('user-joined', {
          userId: socket.user.id,
          username: socket.user.username
        });

        // Get room state
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
        `).all(roomId);

        socket.emit('room-state', { players });
      } catch (error) {
        console.error('Join room error:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Leave room
    socket.on('leave-room', (roomId) => {
      socket.leave(`room:${roomId}`);
      socket.to(`room:${roomId}`).emit('user-left', {
        userId: socket.user.id
      });
    });

    // Update player status
    socket.on('update-status', async (data) => {
      try {
        const { roomId, status } = data;

        // Update status
        db.prepare(`
          UPDATE room_players
          SET status = ?
          WHERE roomId = ? AND userId = ?
        `).run(status, roomId, socket.user.id);

        // Notify room
        gameNamespace.to(`room:${roomId}`).emit('status-updated', {
          userId: socket.user.id,
          status
        });

        // Check if all players are ready
        if (status === 'ready') {
          const players = db.prepare(`
            SELECT status
            FROM room_players
            WHERE roomId = ?
          `).all(roomId);

          const allReady = players.every(p => p.status === 'ready');
          if (allReady) {
            // Start game
            db.prepare(`
              UPDATE game_rooms
              SET status = 'playing'
              WHERE id = ?
            `).run(roomId);

            gameNamespace.to(`room:${roomId}`).emit('game-start');
          }
        }
      } catch (error) {
        console.error('Update status error:', error);
        socket.emit('error', { message: 'Failed to update status' });
      }
    });

    // Game actions
    socket.on('game-action', (data) => {
      const { roomId, action } = data;
      socket.to(`room:${roomId}`).emit('game-action', {
        userId: socket.user.id,
        action
      });
    });

    // Game over
    socket.on('game-over', async (data) => {
      try {
        const { roomId, scores } = data;

        // Save scores
        const stmt = db.prepare(`
          INSERT INTO game_scores (userId, gameId, score)
          VALUES (?, ?, ?)
        `);

        Object.entries(scores).forEach(([userId, score]) => {
          stmt.run(userId, room.gameId, score);
        });

        // Update room status
        db.prepare(`
          UPDATE game_rooms
          SET status = 'waiting'
          WHERE id = ?
        `).run(roomId);

        // Reset player status
        db.prepare(`
          UPDATE room_players
          SET status = 'waiting'
          WHERE roomId = ?
        `).run(roomId);

        // Notify room
        gameNamespace.to(`room:${roomId}`).emit('game-ended', { scores });
      } catch (error) {
        console.error('Game over error:', error);
        socket.emit('error', { message: 'Failed to save game results' });
      }
    });

    // Chat message
    socket.on('chat-message', async (data) => {
      try {
        const { roomId, content } = data;

        // Save message
        const result = db.prepare(`
          INSERT INTO room_messages (roomId, userId, content)
          VALUES (?, ?, ?)
        `).run(roomId, socket.user.id, content);

        const message = db.prepare(`
          SELECT 
            m.*,
            u.username
          FROM room_messages m
          JOIN users u ON m.userId = u.id
          WHERE m.id = ?
        `).get(result.lastInsertRowid);

        // Broadcast to room
        gameNamespace.to(`room:${roomId}`).emit('new-message', message);
      } catch (error) {
        console.error('Chat message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log('Game socket disconnected:', socket.user.id);
    });
  });

  return gameNamespace;
}
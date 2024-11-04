import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import db from './db/index.js';

export default function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
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
      next(new Error('Authentication error'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    console.log('User connected:', socket.user.id);

    // Join user's room
    socket.join(`user:${socket.user.id}`);

    // Update user status
    db.prepare('UPDATE users SET status = ? WHERE id = ?')
      .run('online', socket.user.id);

    // Handle new messages
    socket.on('send_message', async (data) => {
      try {
        const { receiverId, content } = data;

        // Save message to database
        const result = db.prepare(`
          INSERT INTO messages (senderId, receiverId, content)
          VALUES (?, ?, ?)
        `).run(socket.user.id, receiverId, content);

        const message = db.prepare(`
          SELECT m.*, u.username as senderName
          FROM messages m
          JOIN users u ON m.senderId = u.id
          WHERE m.id = ?
        `).get(result.lastInsertRowid);

        // Emit to sender and receiver
        io.to(`user:${socket.user.id}`).to(`user:${receiverId}`).emit('new_message', message);
      } catch (error) {
        console.error('Message error:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.user.id);
      
      db.prepare('UPDATE users SET status = ? WHERE id = ?')
        .run('offline', socket.user.id);
    });
  });

  return io;
}
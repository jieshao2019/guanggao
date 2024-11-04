import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import gameRoutes from './routes/games.js';
import adRoutes from './routes/ads.js';
import friendRoutes from './routes/friends.js';
import messageRoutes from './routes/messages.js';
import achievementRoutes from './routes/achievements.js';
import taskRoutes from './routes/tasks.js';
import notificationRoutes from './routes/notifications.js';
import transactionRoutes from './routes/transactions.js';

// Import admin routes
import adminAuthRoutes from './routes/admin/auth.js';
import adminUserRoutes from './routes/admin/users.js';
import adminGameRoutes from './routes/admin/games.js';
import adminAdRoutes from './routes/admin/ads.js';
import adminTransactionRoutes from './routes/admin/transactions.js';
import adminReportRoutes from './routes/admin/reports.js';

// Import middleware
import auth from './middleware/auth.js';
import adminAuth from './middleware/adminAuth.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// User Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', auth, userRoutes);
app.use('/api/games', auth, gameRoutes);
app.use('/api/ads', auth, adRoutes);
app.use('/api/friends', auth, friendRoutes);
app.use('/api/messages', auth, messageRoutes);
app.use('/api/achievements', auth, achievementRoutes);
app.use('/api/tasks', auth, taskRoutes);
app.use('/api/notifications', auth, notificationRoutes);
app.use('/api/transactions', auth, transactionRoutes);

// Admin Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/users', adminAuth, adminUserRoutes);
app.use('/api/admin/games', adminAuth, adminGameRoutes);
app.use('/api/admin/ads', adminAuth, adminAdRoutes);
app.use('/api/admin/transactions', adminAuth, adminTransactionRoutes);
app.use('/api/admin/reports', adminAuth, adminReportRoutes);

// Error handler
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('game-message', (data) => {
    socket.to(data.roomId).emit('game-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import jwt from 'jsonwebtoken';
import db from '../db/index.js';

export default function auth(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
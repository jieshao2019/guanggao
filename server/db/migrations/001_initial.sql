-- Add VIP related columns
ALTER TABLE users ADD COLUMN vipLevel INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN vipExpireAt TEXT;

-- Add transaction related columns
ALTER TABLE transactions ADD COLUMN method TEXT;
ALTER TABLE transactions ADD COLUMN points INTEGER;

-- Create VIP benefits table
CREATE TABLE IF NOT EXISTS vip_benefits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  level INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create user settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  soundEnabled BOOLEAN DEFAULT 1,
  musicEnabled BOOLEAN DEFAULT 1,
  notificationsEnabled BOOLEAN DEFAULT 1,
  language TEXT DEFAULT 'zh_CN',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create feedback images table
CREATE TABLE IF NOT EXISTS feedback_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feedbackId INTEGER NOT NULL,
  imageUrl TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (feedbackId) REFERENCES feedback(id)
);

-- Create game comments table
CREATE TABLE IF NOT EXISTS game_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id)
);
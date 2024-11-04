-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  requirement INTEGER NOT NULL,
  points INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  achievementId INTEGER NOT NULL,
  unlockedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (achievementId) REFERENCES achievements(id)
);
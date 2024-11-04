-- Create game progress table
CREATE TABLE IF NOT EXISTS game_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  level INTEGER NOT NULL,
  experience INTEGER DEFAULT 0,
  lastPlayedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create game stats table
CREATE TABLE IF NOT EXISTS game_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  totalPlays INTEGER DEFAULT 0,
  totalScore INTEGER DEFAULT 0,
  highScore INTEGER DEFAULT 0,
  playTime INTEGER DEFAULT 0, -- in seconds
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create game buffs table
CREATE TABLE IF NOT EXISTS game_buffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  multiplier REAL NOT NULL,
  expiresAt TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id),
  FOREIGN KEY (itemId) REFERENCES game_items(id)
);
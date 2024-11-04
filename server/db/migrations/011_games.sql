-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  imageUrl TEXT,
  pointsPerPlay INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create game categories table
CREATE TABLE IF NOT EXISTS game_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create game levels table
CREATE TABLE IF NOT EXISTS game_levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameId INTEGER NOT NULL,
  level INTEGER NOT NULL,
  requirement INTEGER NOT NULL,
  reward INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create game items table
CREATE TABLE IF NOT EXISTS game_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameId INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create user items table
CREATE TABLE IF NOT EXISTS user_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  expiresAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (itemId) REFERENCES game_items(id)
);
-- Create game scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  score INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create game leaderboard cache table
CREATE TABLE IF NOT EXISTS game_leaderboard_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameId INTEGER NOT NULL,
  period TEXT NOT NULL,
  data TEXT NOT NULL,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES games(id)
);
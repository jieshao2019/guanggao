-- Create game rooms table
CREATE TABLE IF NOT EXISTS game_rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameId INTEGER NOT NULL,
  name TEXT NOT NULL,
  maxPlayers INTEGER NOT NULL,
  status TEXT DEFAULT 'waiting',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Create room players table
CREATE TABLE IF NOT EXISTS room_players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  roomId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  status TEXT DEFAULT 'waiting',
  joinedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (roomId) REFERENCES game_rooms(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create room messages table
CREATE TABLE IF NOT EXISTS room_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  roomId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  content TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (roomId) REFERENCES game_rooms(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
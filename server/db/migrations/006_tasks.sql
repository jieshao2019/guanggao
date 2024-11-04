-- Create daily tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  requirement INTEGER NOT NULL,
  points INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create user tasks table
CREATE TABLE IF NOT EXISTS user_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  taskId INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT 0,
  claimed BOOLEAN DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (taskId) REFERENCES daily_tasks(id)
);
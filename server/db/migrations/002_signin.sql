-- Create sign in records table
CREATE TABLE IF NOT EXISTS sign_in_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  points INTEGER NOT NULL,
  day INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add sign in related columns to users table
ALTER TABLE users ADD COLUMN lastSignInDate TEXT;
ALTER TABLE users ADD COLUMN consecutiveSignInDays INTEGER DEFAULT 0;
-- Create ad views table
CREATE TABLE IF NOT EXISTS ad_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  points INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  completedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add ad related columns to users table
ALTER TABLE users ADD COLUMN dailyAdViews INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN lastAdViewReset TEXT;
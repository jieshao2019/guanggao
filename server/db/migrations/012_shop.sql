-- Create shop items table
CREATE TABLE IF NOT EXISTS shop_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration INTEGER, -- in minutes
  imageUrl TEXT,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create shop purchases table
CREATE TABLE IF NOT EXISTS shop_purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  points INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (itemId) REFERENCES shop_items(id)
);

-- Create item usage table
CREATE TABLE IF NOT EXISTS item_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  expiresAt TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (itemId) REFERENCES shop_items(id)
);
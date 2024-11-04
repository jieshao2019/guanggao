-- Add more tables for game management
CREATE TABLE IF NOT EXISTS game_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_levels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gameId INTEGER NOT NULL,
  level INTEGER NOT NULL,
  requirement INTEGER NOT NULL,
  reward INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES games(id)
);

-- Add tables for ad management
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  startDate TEXT NOT NULL,
  endDate TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  pointsReward INTEGER NOT NULL,
  dailyLimit INTEGER,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ad_rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaignId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  points INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaignId) REFERENCES ad_campaigns(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add tables for user management
CREATE TABLE IF NOT EXISTS user_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  permissions TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_role_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  roleId INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (roleId) REFERENCES user_roles(id)
);

-- Add tables for content management
CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  startDate TEXT,
  endDate TEXT,
  status TEXT DEFAULT 'draft',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS help_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Add tables for system settings
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Add tables for statistics
CREATE TABLE IF NOT EXISTS daily_statistics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  newUsers INTEGER DEFAULT 0,
  activeUsers INTEGER DEFAULT 0,
  totalRevenue REAL DEFAULT 0,
  adViews INTEGER DEFAULT 0,
  gamesPlayed INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Add tables for user activity tracking
CREATE TABLE IF NOT EXISTS user_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  type TEXT NOT NULL,
  data TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add tables for payment processing
CREATE TABLE IF NOT EXISTS payment_methods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  minAmount REAL,
  maxAmount REAL,
  fee REAL DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  methodId INTEGER NOT NULL,
  amount REAL NOT NULL,
  fee REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  transactionId TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (methodId) REFERENCES payment_methods(id)
);

-- Add tables for VIP management
CREATE TABLE IF NOT EXISTS vip_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  level INTEGER NOT NULL,
  price REAL NOT NULL,
  duration INTEGER NOT NULL,
  benefits TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vip_purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  packageId INTEGER NOT NULL,
  startDate TEXT NOT NULL,
  endDate TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (packageId) REFERENCES vip_packages(id)
);

-- Add tables for game items and inventory
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

-- Add tables for social features
CREATE TABLE IF NOT EXISTS user_follows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  followerId INTEGER NOT NULL,
  followingId INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (followerId) REFERENCES users(id),
  FOREIGN KEY (followingId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_moments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  content TEXT NOT NULL,
  images TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add tables for system logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  adminId INTEGER NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  ip TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (adminId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS error_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  stack TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
-- Create VIP packages table
CREATE TABLE IF NOT EXISTS vip_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  level INTEGER NOT NULL,
  price REAL NOT NULL,
  duration INTEGER NOT NULL, -- in days
  benefits TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create VIP purchases table
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

-- Create payment methods table
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

-- Create payment records table
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
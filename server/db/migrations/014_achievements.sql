-- Create achievement types table
CREATE TABLE IF NOT EXISTS achievement_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert basic achievement types
INSERT INTO achievement_types (name, description) VALUES
('games_played', '游戏场次达成'),
('total_score', '累计分数达成'),
('consecutive_wins', '连胜场次达成'),
('daily_tasks', '每日任务完成'),
('friend_count', '好友数量达成'),
('vip_level', 'VIP等级达成'),
('login_days', '登录天数达成'),
('ad_views', '观看广告次数达成'),
('perfect_score', '完美得分达成'),
('collection', '收集成就达成');

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  typeId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirement INTEGER NOT NULL,
  points INTEGER NOT NULL,
  icon TEXT,
  rarity TEXT DEFAULT 'common', -- common, rare, epic, legendary
  status TEXT DEFAULT 'active',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (typeId) REFERENCES achievement_types(id)
);

-- Insert basic achievements
INSERT INTO achievements (typeId, title, description, requirement, points, rarity) VALUES
(1, '初出茅庐', '完成第一场游戏', 1, 50, 'common'),
(1, '游戏达人', '完成100场游戏', 100, 500, 'rare'),
(1, '游戏大师', '完成1000场游戏', 1000, 2000, 'epic'),
(2, '积分新手', '累计获得1000分', 1000, 100, 'common'),
(2, '积分高手', '累计获得10000分', 10000, 1000, 'rare'),
(2, '积分王者', '累计获得100000分', 100000, 5000, 'legendary'),
(3, '连胜之星', '连续获胜3场', 3, 200, 'common'),
(3, '连胜大师', '连续获胜10场', 10, 1000, 'epic'),
(4, '任务新手', '完成10个每日任务', 10, 100, 'common'),
(4, '任务达人', '完成100个每日任务', 100, 1000, 'rare'),
(5, '社交新手', '添加5个好友', 5, 100, 'common'),
(5, '社交达人', '添加50个好友', 50, 500, 'rare'),
(6, 'VIP入门', '成为VIP1会员', 1, 200, 'common'),
(6, 'VIP至尊', '成为VIP3会员', 3, 1000, 'epic'),
(7, '坚持不懈', '连续登录7天', 7, 200, 'common'),
(7, '永不放弃', '连续登录30天', 30, 1000, 'epic'),
(8, '广告新手', '观看10次广告', 10, 100, 'common'),
(8, '广告达人', '观看100次广告', 100, 1000, 'rare');

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  achievementId INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT 0,
  completedAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (achievementId) REFERENCES achievements(id)
);

-- Create achievement rewards table
CREATE TABLE IF NOT EXISTS achievement_rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  achievementId INTEGER NOT NULL,
  type TEXT NOT NULL, -- points, item, title, avatar_frame
  value TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (achievementId) REFERENCES achievements(id)
);

-- Create achievement progress tracking table
CREATE TABLE IF NOT EXISTS achievement_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  typeId INTEGER NOT NULL,
  value INTEGER DEFAULT 0,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (typeId) REFERENCES achievement_types(id)
);

-- Create achievement milestones table
CREATE TABLE IF NOT EXISTS achievement_milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  count INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Insert basic milestones
INSERT INTO achievement_milestones (count, title, description, points) VALUES
(5, '成就收藏家', '解锁5个成就', 200),
(10, '成就猎人', '解锁10个成就', 500),
(20, '成就大师', '解锁20个成就', 1000),
(50, '成就王者', '解锁50个成就', 5000);
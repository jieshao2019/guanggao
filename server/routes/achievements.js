import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get all achievements with progress
router.get('/', auth, (req, res) => {
  try {
    const achievements = db.prepare(`
      SELECT 
        a.*,
        at.name as typeName,
        ua.progress,
        ua.completed,
        ua.completedAt,
        GROUP_CONCAT(ar.type || ':' || ar.value) as rewards
      FROM achievements a
      JOIN achievement_types at ON a.typeId = at.id
      LEFT JOIN user_achievements ua ON a.id = ua.achievementId AND ua.userId = ?
      LEFT JOIN achievement_rewards ar ON a.id = ar.achievementId
      WHERE a.status = 'active'
      GROUP BY a.id
      ORDER BY a.typeId, a.requirement
    `).all(req.user.id);

    // Get achievement milestones
    const milestones = db.prepare(`
      WITH UserAchievements AS (
        SELECT COUNT(*) as count
        FROM user_achievements
        WHERE userId = ? AND completed = 1
      )
      SELECT 
        am.*,
        CASE WHEN ua.count >= am.count THEN 1 ELSE 0 END as completed
      FROM achievement_milestones am
      CROSS JOIN UserAchievements ua
      ORDER BY am.count
    `).all(req.user.id);

    res.json({
      achievements: achievements.map(a => ({
        ...a,
        rewards: a.rewards?.split(',').map(r => {
          const [type, value] = r.split(':');
          return { type, value };
        }) || []
      })),
      milestones
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get achievement progress
router.get('/progress', auth, (req, res) => {
  try {
    const progress = db.prepare(`
      SELECT 
        ap.*,
        at.name as typeName
      FROM achievement_progress ap
      JOIN achievement_types at ON ap.typeId = at.id
      WHERE ap.userId = ?
    `).all(req.user.id);

    res.json(progress);
  } catch (error) {
    console.error('Get achievement progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update achievement progress
router.post('/progress/:typeId', auth, (req, res) => {
  try {
    const { value } = req.body;
    const typeId = req.params.typeId;

    // Start transaction
    db.transaction(() => {
      // Update progress
      const progress = db.prepare(`
        SELECT * FROM achievement_progress
        WHERE userId = ? AND typeId = ?
      `).get(req.user.id, typeId);

      if (progress) {
        db.prepare(`
          UPDATE achievement_progress
          SET value = value + ?,
              updatedAt = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(value, progress.id);
      } else {
        db.prepare(`
          INSERT INTO achievement_progress (userId, typeId, value)
          VALUES (?, ?, ?)
        `).run(req.user.id, typeId, value);
      }

      // Check achievements
      const achievements = db.prepare(`
        SELECT a.*
        FROM achievements a
        LEFT JOIN user_achievements ua ON a.id = ua.achievementId AND ua.userId = ?
        WHERE a.typeId = ?
        AND ua.id IS NULL
        AND a.requirement <= ?
      `).all(req.user.id, typeId, value);

      // Award achievements
      achievements.forEach(achievement => {
        // Add achievement
        db.prepare(`
          INSERT INTO user_achievements (
            userId, achievementId, progress, completed, completedAt
          ) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
        `).run(req.user.id, achievement.id, achievement.requirement);

        // Award points
        db.prepare(`
          UPDATE users
          SET points = points + ?
          WHERE id = ?
        `).run(achievement.points, req.user.id);

        // Create notification
        db.prepare(`
          INSERT INTO notifications (
            userId, type, title, content
          ) VALUES (?, 'achievement', ?, ?)
        `).run(
          req.user.id,
          '解锁成就',
          `获得成就"${achievement.title}"，奖励${achievement.points}积分`
        );
      });

      // Check milestones
      const completedCount = db.prepare(`
        SELECT COUNT(*) as count
        FROM user_achievements
        WHERE userId = ? AND completed = 1
      `).get(req.user.id).count;

      const milestones = db.prepare(`
        SELECT *
        FROM achievement_milestones
        WHERE count <= ?
        AND id NOT IN (
          SELECT milestoneId
          FROM user_milestone_rewards
          WHERE userId = ?
        )
      `).all(completedCount, req.user.id);

      // Award milestone rewards
      milestones.forEach(milestone => {
        db.prepare(`
          INSERT INTO user_milestone_rewards (userId, milestoneId)
          VALUES (?, ?)
        `).run(req.user.id, milestone.id);

        // Award points
        db.prepare(`
          UPDATE users
          SET points = points + ?
          WHERE id = ?
        `).run(milestone.points, req.user.id);

        // Create notification
        db.prepare(`
          INSERT INTO notifications (
            userId, type, title, content
          ) VALUES (?, 'milestone', ?, ?)
        `).run(
          req.user.id,
          '达成里程碑',
          `解锁${milestone.count}个成就，获得${milestone.points}积分奖励`
        );
      });
    })();

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update achievement progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
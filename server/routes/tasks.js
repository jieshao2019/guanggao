import express from 'express';
import auth from '../middleware/auth.js';
import db from '../db/index.js';

const router = express.Router();

// Get daily tasks
router.get('/', auth, (req, res) => {
  try {
    const tasks = db.prepare(`
      SELECT 
        t.*,
        ut.progress,
        ut.completed,
        ut.claimed
      FROM daily_tasks t
      LEFT JOIN user_tasks ut ON t.id = ut.taskId AND ut.userId = ?
      WHERE t.status = 'active'
    `).all(req.user.id);

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task progress
router.put('/:id/progress', auth, (req, res) => {
  try {
    const { progress } = req.body;
    const taskId = req.params.id;

    // Start transaction
    db.transaction(() => {
      // Get task info
      const task = db.prepare(`
        SELECT * FROM daily_tasks WHERE id = ?
      `).get(taskId);

      // Update or create user task
      const userTask = db.prepare(`
        SELECT * FROM user_tasks
        WHERE userId = ? AND taskId = ?
      `).get(req.user.id, taskId);

      if (userTask) {
        db.prepare(`
          UPDATE user_tasks
          SET progress = ?,
              completed = CASE WHEN ? >= ? THEN 1 ELSE 0 END
          WHERE id = ?
        `).run(progress, progress, task.requirement, userTask.id);
      } else {
        db.prepare(`
          INSERT INTO user_tasks (userId, taskId, progress, completed)
          VALUES (?, ?, ?, ?)
        `).run(req.user.id, taskId, progress, progress >= task.requirement ? 1 : 0);
      }

      // Check if task is newly completed
      if (progress >= task.requirement && !userTask?.completed) {
        // Create notification
        db.prepare(`
          INSERT INTO notifications (userId, type, title, content)
          VALUES (?, 'task_complete', '任务完成', '完成任务 "${task.title}"')
        `).run(req.user.id);
      }
    })();

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Update task progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim task reward
router.post('/:id/claim', auth, (req, res) => {
  try {
    const taskId = req.params.id;

    // Start transaction
    db.transaction(() => {
      // Get task info
      const task = db.prepare(`
        SELECT t.*, ut.completed, ut.claimed
        FROM daily_tasks t
        JOIN user_tasks ut ON t.id = ut.taskId
        WHERE t.id = ? AND ut.userId = ?
      `).get(taskId, req.user.id);

      if (!task) {
        throw new Error('Task not found');
      }

      if (!task.completed) {
        throw new Error('Task not completed');
      }

      if (task.claimed) {
        throw new Error('Reward already claimed');
      }

      // Mark as claimed
      db.prepare(`
        UPDATE user_tasks
        SET claimed = 1
        WHERE userId = ? AND taskId = ?
      `).run(req.user.id, taskId);

      // Award points
      db.prepare(`
        UPDATE users
        SET points = points + ?
        WHERE id = ?
      `).run(task.points, req.user.id);

      // Create notification
      db.prepare(`
        INSERT INTO notifications (userId, type, title, content)
        VALUES (?, 'task_reward', '任务奖励', '获得 ${task.points} 积分')
      `).run(req.user.id);
    })();

    res.json({ message: 'Reward claimed successfully' });
  } catch (error) {
    console.error('Claim task reward error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
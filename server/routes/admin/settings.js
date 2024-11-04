import express from 'express';
import adminAuth from '../../middleware/adminAuth.js';
import db from '../../db/index.js';

const router = express.Router();

// Get all settings
router.get('/', adminAuth, (req, res) => {
  try {
    const settings = db.prepare(`
      SELECT * FROM system_settings
      ORDER BY key
    `).all();

    res.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update setting
router.put('/:key', adminAuth, (req, res) => {
  try {
    const { value } = req.body;

    db.prepare(`
      UPDATE system_settings
      SET value = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE key = ?
    `).run(value, req.params.key);

    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment methods
router.get('/payments', adminAuth, (req, res) => {
  try {
    const methods = db.prepare(`
      SELECT * FROM payment_methods
      ORDER BY name
    `).all();

    res.json(methods);
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update payment method
router.put('/payments/:id', adminAuth, (req, res) => {
  try {
    const { name, status, minAmount, maxAmount, fee } = req.body;

    db.prepare(`
      UPDATE payment_methods
      SET name = ?,
          status = ?,
          minAmount = ?,
          maxAmount = ?,
          fee = ?
      WHERE id = ?
    `).run(name, status, minAmount, maxAmount, fee, req.params.id);

    res.json({ message: 'Payment method updated successfully' });
  } catch (error) {
    console.error('Update payment method error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get VIP packages
router.get('/vip', adminAuth, (req, res) => {
  try {
    const packages = db.prepare(`
      SELECT * FROM vip_packages
      ORDER BY level
    `).all();

    res.json(packages);
  } catch (error) {
    console.error('Get VIP packages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update VIP package
router.put('/vip/:id', adminAuth, (req, res) => {
  try {
    const { name, price, duration, benefits, status } = req.body;

    db.prepare(`
      UPDATE vip_packages
      SET name = ?,
          price = ?,
          duration = ?,
          benefits = ?,
          status = ?
      WHERE id = ?
    `).run(name, price, duration, benefits, status, req.params.id);

    res.json({ message: 'VIP package updated successfully' });
  } catch (error) {
    console.error('Update VIP package error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
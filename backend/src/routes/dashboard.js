// backend/src/routes/dashboard.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db');

const router = express.Router();

// Employee dashboard stats
router.get('/employee', authMiddleware(['employee']), async (req, res) => {
  try {
    const total = await pool.query(
      'SELECT COUNT(*) FROM leave_requests WHERE user_id = $1',
      [req.user.id]
    );
    const pending = await pool.query(
      "SELECT COUNT(*) FROM leave_requests WHERE user_id = $1 AND status = 'pending'",
      [req.user.id]
    );
    const approved = await pool.query(
      "SELECT COUNT(*) FROM leave_requests WHERE user_id = $1 AND status = 'approved'",
      [req.user.id]
    );

    res.json({
      total: Number(total.rows[0].count),
      pending: Number(pending.rows[0].count),
      approved: Number(approved.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Manager dashboard stats
router.get('/manager', authMiddleware(['manager']), async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) FROM leave_requests');
    const pending = await pool.query(
      "SELECT COUNT(*) FROM leave_requests WHERE status = 'pending'"
    );
    const approved = await pool.query(
      "SELECT COUNT(*) FROM leave_requests WHERE status = 'approved'"
    );

    res.json({
      total: Number(total.rows[0].count),
      pending: Number(pending.rows[0].count),
      approved: Number(approved.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

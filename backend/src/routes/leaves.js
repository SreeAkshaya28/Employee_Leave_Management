// backend/src/routes/leaves.js
const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db');

const router = express.Router();

// EMPLOYEE: Apply for leave
router.post('/', authMiddleware(['employee']), async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const result = await pool.query(
      `INSERT INTO leave_requests 
       (user_id, leave_type, start_date, end_date, total_days, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [req.user.id, leaveType, start, end, totalDays, reason]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// EMPLOYEE: View my leave requests
router.get('/my-requests', authMiddleware(['employee']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM leave_requests
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// EMPLOYEE: Cancel pending request
router.delete('/:id', authMiddleware(['employee']), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM leave_requests
       WHERE id = $1 AND user_id = $2 AND status = 'pending'
       RETURNING id`,
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Request not found or not pending' });
    }

    res.json({ message: 'Request cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// EMPLOYEE: View leave balance
router.get('/balance', authMiddleware(['employee']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sick_leave AS "sickLeave",
              casual_leave AS "casualLeave",
              vacation AS "vacation"
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MANAGER: View all leave requests
router.get('/all', authMiddleware(['manager']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT lr.*, u.name AS employee_name, u.email AS employee_email
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       ORDER BY lr.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MANAGER: View pending leave requests
router.get('/pending', authMiddleware(['manager']), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT lr.*, u.name AS employee_name, u.email AS employee_email
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE lr.status = 'pending'
       ORDER BY lr.created_at ASC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MANAGER: Approve leave
router.put('/:id/approve', authMiddleware(['manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { managerComment } = req.body;

    const reqResult = await pool.query(
      `SELECT lr.*, u.sick_leave, u.casual_leave, u.vacation
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       WHERE lr.id = $1`,
      [id]
    );

    if (reqResult.rows.length === 0) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const request = reqResult.rows[0];
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Already processed' });
    }

    let column;
    if (request.leave_type === 'sick') column = 'sick_leave';
    else if (request.leave_type === 'casual') column = 'casual_leave';
    else column = 'vacation';

    await pool.query(
      `UPDATE users
       SET ${column} = GREATEST(${column} - $1, 0)
       WHERE id = $2`,
      [request.total_days, request.user_id]
    );

    const updateResult = await pool.query(
      `UPDATE leave_requests
       SET status = 'approved',
           manager_comment = $1
       WHERE id = $2
       RETURNING *`,
      [managerComment || '', id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MANAGER: Reject leave
router.put('/:id/reject', authMiddleware(['manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { managerComment } = req.body;

    const result = await pool.query(
      `UPDATE leave_requests
       SET status = 'rejected',
           manager_comment = $1
       WHERE id = $2 AND status = 'pending'
       RETURNING *`,
      [managerComment || '', id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Request not found or already processed' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

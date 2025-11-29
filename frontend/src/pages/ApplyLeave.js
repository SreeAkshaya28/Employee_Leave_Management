import React, { useState } from 'react';
import api from '../api';

const ApplyLeave = () => {
  const [form, setForm] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/leaves', form);
      setMsg('Leave applied successfully.');
      setForm({ leaveType: 'sick', startDate: '', endDate: '', reason: '' });
    } catch {
      setMsg('Error applying leave. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Apply Leave</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 16 }}>
        Create a new leave request for manager approval.
      </p>
      {msg && <p className="success-message">{msg}</p>}

      <form onSubmit={handleSubmit}>
        <label>Leave Type</label>
        <br />
        <select
          value={form.leaveType}
          onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
        >
          <option value="sick">Sick</option>
          <option value="casual">Casual</option>
          <option value="vacation">Vacation</option>
        </select>
        <br />

        <label>Start Date</label>
        <br />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <br />

        <label>End Date</label>
        <br />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
        <br />

        <label>Reason</label>
        <br />
        <textarea
          placeholder="Reason for leave"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <br />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ApplyLeave;

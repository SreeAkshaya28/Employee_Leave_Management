import React, { useEffect, useState } from 'react';
import api from '../api';

const EmployeeDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/employee').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Employee Dashboard</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 20 }}>
        Quick overview of your leave activity.
      </p>

      <div className="stats-grid">
        <div className="stat-box stat-total">
          <span className="stat-label">Total Requests</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-box stat-pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
        <div className="stat-box stat-approved">
          <span className="stat-label">Approved</span>
          <span className="stat-value">{stats.approved}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

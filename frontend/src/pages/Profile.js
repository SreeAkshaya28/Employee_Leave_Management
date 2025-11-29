import React, { useEffect, useState } from 'react';
import api from '../api';

const Profile = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    api.get('/leaves/balance').then((res) => setBalance(res.data));
  }, []);

  if (!balance) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Profile & Leave Balance</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 20 }}>
        Remaining leave quotas for this year.
      </p>

      <div className="stats-grid">
        <div className="stat-box stat-total">
          <span className="stat-label">Sick</span>
          <span className="stat-value">{balance.sickLeave}</span>
        </div>
        <div className="stat-box stat-pending">
          <span className="stat-label">Casual</span>
          <span className="stat-value">{balance.casualLeave}</span>
        </div>
        <div className="stat-box stat-approved">
          <span className="stat-label">Vacation</span>
          <span className="stat-value">{balance.vacation}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;

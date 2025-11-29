import React, { useEffect, useState } from 'react';
import api from '../api';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get('/leaves/all').then((res) => setRequests(res.data));
  }, []);

  const getStatusClass = (status) => {
    if (status === 'approved') return 'status-pill status-approved';
    if (status === 'pending') return 'status-pill status-pending';
    return 'status-pill status-rejected';
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>All Requests</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 16 }}>
        History of all leave requests from your team.
      </p>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.employee_name}</td>
              <td>{r.leave_type}</td>
              <td>
                <span className={getStatusClass(r.status)}>{r.status}</span>
              </td>
              <td>
                {r.start_date?.slice(0, 10)} to {r.end_date?.slice(0, 10)}
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: 12 }}>
                No requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequests;

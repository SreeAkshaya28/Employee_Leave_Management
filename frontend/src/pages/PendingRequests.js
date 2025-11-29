import React, { useEffect, useState } from 'react';
import api from '../api';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const load = () => {
    api.get('/leaves/pending').then((res) => setRequests(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id, action) => {
    const comment = window.prompt('Manager comment (optional)');
    await api.put(`/leaves/${id}/${action}`, { managerComment: comment });
    load();
  };

  const getStatusClass = (status) => {
    if (status === 'approved') return 'status-pill status-approved';
    if (status === 'pending') return 'status-pill status-pending';
    return 'status-pill status-rejected';
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Pending Requests</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 16 }}>
        Review and approve or reject pending leave requests.
      </p>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.employee_name}</td>
              <td>{r.leave_type}</td>
              <td>
                {r.start_date?.slice(0, 10)} to {r.end_date?.slice(0, 10)}
              </td>
              <td>
                <span className={getStatusClass(r.status)}>{r.status}</span>
              </td>
              <td>
                <button
                  className="table-action-btn table-action-approve"
                  onClick={() => act(r.id, 'approve')}
                >
                  Approve
                </button>{' '}
                <button
                  className="table-action-btn table-action-reject"
                  onClick={() => act(r.id, 'reject')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: 12 }}>
                No pending requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRequests;

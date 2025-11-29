import React, { useEffect, useState } from 'react';
import api from '../api';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  const load = () => {
    api.get('/leaves/my-requests').then((res) => setRequests(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    await api.delete(`/leaves/${id}`);
    load();
  };

  const getStatusClass = (status) => {
    if (status === 'approved') return 'status-pill status-approved';
    if (status === 'pending') return 'status-pill status-pending';
    return 'status-pill status-rejected';
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>My Requests</h2>
      <p style={{ color: '#64748b', marginTop: 4, marginBottom: 16 }}>
        Track the status of all your leave applications.
      </p>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.leave_type}</td>
              <td>
                {r.start_date?.slice(0, 10)} to {r.end_date?.slice(0, 10)}
              </td>
              <td>
                <span className={getStatusClass(r.status)}>{r.status}</span>
              </td>
              <td>
                {r.status === 'pending' && (
                  <button
                    className="table-action-btn table-action-cancel"
                    onClick={() => cancel(r.id)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: 12 }}>
                No leave requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequests;

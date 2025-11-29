import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              marginRight: 10,
              fontSize: 16,
            }}
          >
            EL
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              EmpLeave Cloud
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Smart Employee Leave Management
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: 0, marginBottom: 4 }}>Welcome!</h2>
        <p style={{ color: '#6b7280', marginTop: 0, marginBottom: 18 }}>
          Sign in to manage your leaves and approvals.
        </p>

        {error && (
          <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <br />

          <label>Password</label>
          <br />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <br />

          <button type="submit" style={{ marginTop: 4 }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: 14, fontSize: 14 }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

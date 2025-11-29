import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/login');
    } catch {
      setError('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand row – same as Login */}
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

        <h2 style={{ marginTop: 0, marginBottom: 4 }}>Create account</h2>
        <p style={{ color: '#6b7280', marginTop: 0, marginBottom: 18 }}>
          Sign up as an employee or manager to get started.
        </p>

        {error && (
          <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <br />
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <br />

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

          <label>Role</label>
          <br />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <br />

          <button type="submit" style={{ marginTop: 4 }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: 14, fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import ManagerDashboard from './pages/ManagerDashboard';
import PendingRequests from './pages/PendingRequests';
import AllRequests from './pages/AllRequests';

const App = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  const isManager = user.role === 'manager';

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <span>
            Logged in as {user.name} ({user.role})
          </span>
        </div>

        <div className="nav-links">
          {isManager ? (
            <>
              <NavLink to="/manager/dashboard" className="nav-link">
                Dashboard
              </NavLink>
              <NavLink to="/manager/pending" className="nav-link">
                Pending
              </NavLink>
              <NavLink to="/manager/all" className="nav-link">
                All
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/employee/dashboard" className="nav-link">
                Dashboard
              </NavLink>
              <NavLink to="/employee/apply" className="nav-link">
                Apply Leave
              </NavLink>
              <NavLink to="/employee/requests" className="nav-link">
                My Requests
              </NavLink>
              <NavLink to="/employee/profile" className="nav-link">
                Profile
              </NavLink>
            </>
          )}
        </div>

        <button className="nav-logout" onClick={logout}>
          Logout
        </button>
      </nav>

      <main className="main-content">
        <Routes>
          {/* Employee routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/apply" element={<ApplyLeave />} />
          <Route path="/employee/requests" element={<MyRequests />} />
          <Route path="/employee/profile" element={<Profile />} />

          {/* Manager routes */}
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/pending" element={<PendingRequests />} />
          <Route path="/manager/all" element={<AllRequests />} />

          <Route
            path="*"
            element={
              <Navigate
                to={isManager ? '/manager/dashboard' : '/employee/dashboard'}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

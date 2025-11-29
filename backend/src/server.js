// backend/src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const authRoutes = require('./routes/auth');
const leaveRoutes = require('./routes/leaves');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Employee Leave Management API is running');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

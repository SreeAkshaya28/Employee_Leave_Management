// backend/src/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL connected successfully');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };

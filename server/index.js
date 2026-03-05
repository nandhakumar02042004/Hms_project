const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

// Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Dynamic Resource Routes (General Helper)
const createResourceRoute = (tableName) => {
  app.get(`/api/${tableName}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName} ORDER BY id DESC`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

// Registered Tables from ER Diagram
const tables = [
  'users', 'doctors', 'patients', 'appointments', 'specializations', 
  'prescriptions', 'lab_tests', 'lab_orders', 'rooms', 'bills', 'staff'
];

tables.forEach(createResourceRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

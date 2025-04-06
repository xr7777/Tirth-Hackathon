require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Ensure DB connection is established

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../page')));

// Routes
app.use('/auth', require('./routes/authRoutes'));

// Default route
app.get('/', (req, res) => res.send('Welcome to the Hospital Management System'));

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server after DB connection
db.then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Failed to connect to the database:', err);
});
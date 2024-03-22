// backend/routes/adminRoutes.js

const express = require('express');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Example route for admin-specific action
router.post('/add-product', isAdmin, (req, res) => {
  // Add product logic
  res.json({ message: 'Product added successfully' });
});

module.exports = router;

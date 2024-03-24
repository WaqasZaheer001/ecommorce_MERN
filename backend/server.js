// server.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const { isAdmin } = require('./middleware/isAdmin'); // Import isAdmin middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes'); // Removed import statement for adminRoutes.js
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Apply isAdmin middleware to admin-specific routes
app.use('/api/admin', isAdmin); // Apply isAdmin middleware to all routes under /api/admin
// app.use('/api/admin', adminRoutes); // Removed mounting of adminRoutes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

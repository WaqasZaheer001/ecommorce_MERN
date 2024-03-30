const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { isAdmin } = require('./middleware/isAdmin');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Apply isAdmin middleware to admin-specific routes
app.use('/api/admin', isAdmin);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

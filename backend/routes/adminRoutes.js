// backend/routes/adminRoutes.js

const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/product');
const Category = require('../models/category');

const router = express.Router();

// Route for adding a new product
router.post('/add-product', isAdmin, async (req, res) => {
  try {
    const { name, description, price, images, size, color, brand, availability, category, shippingDetails } = req.body;

    // Create a new product object
    const product = new Product({
      name,
      description,
      price,
      images,
      size,
      color,
      brand,
      availability,
      category,
      shippingDetails
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route for adding a new category
router.post('/add-category', isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new category object
    const category = new Category({
      name,
      description
    });

    // Save the category to the database
    await category.save();

    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

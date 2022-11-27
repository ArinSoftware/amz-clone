const router = require('express').Router();
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Create a new product POST
router.post('/products', async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.photo.tempFilePath,
    {
      use_filename: true,
      folder: 'amz_clone',
    }
  );

  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = result.secure_url;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    // remove image from tmp file
    fs.unlinkSync(req.files.photo.tempFilePath);

    res.json({
      status: true,
      message: 'Product succesfully saved',
    });
  } catch (error) {
    res.status(500).jason({
      status: false,
      message: error.message,
    });
  }
});

// Get all products GET

// Get a product GET

// Update a product PUT

// Delete a product DELETE

module.exports = router;

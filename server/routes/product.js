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
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get a product GET
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Update a product PUT
router.put('/products/:id', async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.photo.tempFilePath,
    {
      use_filename: true,
      folder: 'amz_clone',
    }
  );

  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: result.secure_url,
          description: req.body.description,
          owner: req.body.ownerID,
          stockQuantity: req.body.stockQuantity,
        },
      },
      { upsert: true }
    );

    // remove image from tmp file
    fs.unlinkSync(req.files.photo.tempFilePath);

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Delete a product DELETE
router.delete('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });

    if (product) {
      res.json({
        success: true,
        message: 'The Product Successfully Deleted',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;

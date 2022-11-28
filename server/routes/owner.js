const router = require('express').Router();
const Owner = require('../models/Owner');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Create a new product POST
router.post('/owners', async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.photo.tempFilePath,
    {
      use_filename: true,
      folder: 'amz_clone',
    }
  );

  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = result.secure_url;

    await owner.save();

    // remove image from tmp file
    fs.unlinkSync(req.files.photo.tempFilePath);

    res.json({
      status: true,
      message: 'Owner succesfully saved',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get all owners
router.get('/owners', async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;

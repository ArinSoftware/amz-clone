const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const User = require('./models/User');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

dotenv.config();

//cloudinary config settings
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URI, (err) => {
  if (err) {
    console.log('err');
  } else {
    console.log('Connected to the DB succesfully');
  }
});

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));

//require apis
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Err at server running at port: ${PORT}`, err);
  } else {
    console.log('Application running on port: 3000');
  }
});

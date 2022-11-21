const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

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

app.get('/', (req, res) => {
  res.json('Hello Amazon Clone');
});

app.post('/', (req, res) => {
  let user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('User succesfully saved!');
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Err at server running at port: ${PORT}`, err);
  } else {
    console.log('Application running on port: 3000');
  }
});

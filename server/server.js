const express = require('express');
const morgan = require('morgan');

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json('Hello Amazon Clone');
});

app.post('/', (req, res) => {
  console.log('BODY', req.body);
});

app.listen(port, (err) => {
  if (err) {
    console.log('Err at server running:', err);
  } else {
    console.log('Application running on port: 3000');
  }
});

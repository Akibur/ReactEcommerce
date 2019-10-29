const express = require('express');
const mongoose = require('mongoose');

const customers = require('./routes/api/customers');
const admins = require('./routes/api/admins');
const products = require('./routes/api/products');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo DB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Using Routs

app.use('/api/customers', customers);
app.use('/api/admins', admins);
app.use('/api/products', products);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servet running on port ${port}`);
});

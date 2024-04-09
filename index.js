const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config({ path: './config/config.env' });

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started on port ${PORT}`.blue.bold)
);

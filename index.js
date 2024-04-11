const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

connectDatabase().catch(console.dir);

const orders = require('./routes/orders');
const products = require('./routes/products');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use(errorHandler);
app.use(cookieParser())
 
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started on port ${PORT}`.blue.bold)
);

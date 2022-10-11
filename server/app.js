// Requirements

require('dotenv').config();

require('express-async-errors');

const cors = require('cors');

const morgan = require('morgan');

const express = require('express');

const app = express();


// routers

const authRoutes = require('./routes/authRoutes');

const customerRoutes = require('./routes/customerRoutes');

const invoiceRoutes = require('./routes/invoiceRoutes');

const paymentsRoutes = require('./routes/paymentsRoutes.js');


// middleware

const notFoundMiddleware = require('./middleware/not-found');

if (process.env.NODE_ENV !== 'production') {

  app.use(morgan('dev'));

};

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', async (req, res) => {
  res.send('Invocify API')
});

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/customer', customerRoutes);

app.use('/api/v1/invoice', invoiceRoutes);

// app.use('/api/v1/items', itemsRoutes);

app.use('/api/v1/payment', paymentsRoutes);

app.use(notFoundMiddleware);

module.exports = app;

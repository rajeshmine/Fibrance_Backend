const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const wishlistRoutes = require('./routes/wishlists');
const paymentRoutes = require('./routes/payments');
const inventoryRoutes = require('./routes/inventory');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route mounting
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/wishlists', wishlistRoutes);
app.use('/payments', paymentRoutes);
app.use('/inventory', inventoryRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;

// And for local dev:
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API');
});


// Routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/borrowers', borrowerRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

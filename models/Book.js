const mongoose = require('mongoose');
const Author = require('./Author');  // Author model for reference

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  isbn: { type: String, unique: true, required: true },
  availableCopies: { type: Number, required: true, min: 0 },
  borrowedCount: { type: Number, default: 0 },
});

bookSchema.pre('save', function(next) {
  if (this.borrowedCount > 10 && this.availableCopies > 100) {
    return next(new Error('Available copies cannot exceed 100 if borrowed more than 10 times.'));
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);

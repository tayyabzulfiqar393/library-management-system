const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  membershipActive: { type: Boolean, default: true },
  membershipType: { type: String, enum: ['Standard', 'Premium'], required: true },
});

borrowerSchema.methods.canBorrow = function() {
  const maxBooks = this.membershipType === 'Premium' ? 10 : 5;
  return this.borrowedBooks.length < maxBooks;
};

module.exports = mongoose.model('Borrower', borrowerSchema);

const mongoose = require('mongoose');
const Author = require('./models/Author');
const Book = require('./models/Book');
const Borrower = require('./models/Borrower');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library-management-system')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Sample Data
const authors = [
  { name: 'J.K. Rowling', email: 'jk.rowling@example.com', phoneNumber: '+923013339296' },
  { name: 'George R.R. Martin', email: 'george.martin@example.com', phoneNumber: '+923013339297' },
  { name: 'J.R.R. Tolkien', email: 'jrr.tolkien@example.com', phoneNumber: '+923013339298' },
];

const books = [
  { title: 'Harry Potter', author: null, isbn: '9780747532699', availableCopies: 10 },
  { title: 'Game of Thrones', author: null, isbn: '9780553593716', availableCopies: 5 },
  { title: 'The Hobbit', author: null, isbn: '9780345339683', availableCopies: 8 },
];

const borrowers = [
  { name: 'John Doe', membershipActive: true, membershipType: 'Standard', borrowedBooks: [] },
  { name: 'Jane Smith', membershipActive: true, membershipType: 'Premium', borrowedBooks: [] },
  { name: 'Sam Wilson', membershipActive: false, membershipType: 'Standard', borrowedBooks: [] },
];

// Seed Function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Author.deleteMany({});
    await Book.deleteMany({});
    await Borrower.deleteMany({});

    // Insert authors
    const createdAuthors = await Author.insertMany(authors);

    // Map authors to books
    books[0].author = createdAuthors[0]._id;
    books[1].author = createdAuthors[1]._id;
    books[2].author = createdAuthors[2]._id;

    // Insert books
    await Book.insertMany(books);

    // Insert borrowers
    await Borrower.insertMany(borrowers);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

// Run Seed Function
seedDatabase();

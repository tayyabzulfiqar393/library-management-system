const Borrower = require('../models/Borrower');
const Book = require('../models/Book');

exports.createBorrower = async (req, res) => {
  try {
    const { name, membershipType } = req.body;
    const newBorrower = new Borrower({ name, membershipType });
    await newBorrower.save();
    res.status(201).json({ message: 'Borrower created successfully', borrower: newBorrower });
  } catch (error) {
    res.status(500).json({ message: 'Error creating borrower', error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { borrowerId, bookId } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    if (!borrower || !book) {
      return res.status(404).json({ message: 'Borrower or Book not found' });
    }

    if (!borrower.canBorrow()) {
      return res.status(400).json({ message: 'Borrower cannot borrow more books' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No copies available to borrow' });
    }

    borrower.borrowedBooks.push(book._id);
    book.availableCopies -= 1;
    book.borrowedCount += 1;

    await borrower.save();
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book', error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowerId, bookId } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    const book = await Book.findById(bookId);

    if (!borrower || !book) {
      return res.status(404).json({ message: 'Borrower or Book not found' });
    }

    borrower.borrowedBooks.pull(book._id);
    book.availableCopies += 1;

    await borrower.save();
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error: error.message });
  }
};

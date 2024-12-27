const Book = require('../models/Book');
const Borrower = require('../models/Borrower');

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;
    // Check if the author already has 5 books
    const booksByAuthor = await Book.find({ author });
    if (booksByAuthor.length >= 5) {
      return res.status(400).json({
        error: "This author is already linked to 5 books. Cannot link more.",
      });
    }

    const newBook = new Book({ title, author, isbn, availableCopies });
    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, availableCopies } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, isbn, availableCopies }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

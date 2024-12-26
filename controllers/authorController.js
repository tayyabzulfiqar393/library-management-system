const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const newAuthor = new Author({ name, email, phoneNumber });
    await newAuthor.save();
    res.status(201).json({ message: 'Author created successfully', author: newAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Error creating author', error: error.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(id, { name, email, phoneNumber }, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
  } catch (error) {
    res.status(500).json({ message: 'Error updating author', error: error.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error: error.message });
  }
};

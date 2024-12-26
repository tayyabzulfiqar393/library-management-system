const { body, validationResult } = require('express-validator');

const validateBook = [
  body('isbn').isLength({ min: 10, max: 13 }).withMessage('ISBN must be 10 or 13 characters long'),
  body('title').notEmpty().withMessage('Title is required'),
  body('availableCopies').isInt({ min: 0 }).withMessage('Available copies must be a non-negative integer'),
  body('author').notEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateBook;

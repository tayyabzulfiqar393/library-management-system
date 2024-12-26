const { body, validationResult } = require('express-validator');

const validateAuthor = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('phoneNumber').matches(/^(\+923\d{9})$/).withMessage('Invalid phone number format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateAuthor;

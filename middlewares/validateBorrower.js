const { body, validationResult } = require('express-validator');

const validateBorrower = [
  body('name').notEmpty().withMessage('Name is required'),
  body('membershipType').isIn(['Standard', 'Premium']).withMessage('Invalid membership type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateBorrower;

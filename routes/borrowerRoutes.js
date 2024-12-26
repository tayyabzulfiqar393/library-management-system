const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const validateBorrower = require('../middlewares/validateBorrower');

router.post('/add', validateBorrower, borrowerController.createBorrower);
router.post('/borrow', borrowerController.borrowBook);
router.post('/return', borrowerController.returnBook);

module.exports = router;

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middlewares/validateBook');

router.post('/add', validateBook, bookController.createBook);
router.put('/:id/update', validateBook, bookController.updateBook);
router.delete('/:id/delete', bookController.deleteBook);

module.exports = router;

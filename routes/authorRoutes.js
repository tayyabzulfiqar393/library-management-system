const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const validateAuthor = require('../middlewares/validateAuthor');

router.post('/add', validateAuthor, authorController.createAuthor);
router.put('/:id/update', validateAuthor, authorController.updateAuthor);
router.delete('/:id/delete', authorController.deleteAuthor);

module.exports = router;

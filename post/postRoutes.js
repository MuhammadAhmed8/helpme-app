const express = require('express');
const router = express.Router();

const postController = require('./postController');

router.post('/post', postController.createPost);

router.post('/post/comment', postController.createComment);

module.exports = router;
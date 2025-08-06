const express = require('express');
const router = express.Router();
const {
  createPost,
  getFeed,
  getPostsByUserId,
  deletePost,
} = require('../controllers/postController');
const { authMiddleware } = require('../middleware/auth');


router.post('/', authMiddleware, createPost);


router.get('/', getFeed);
router.get('/feed', getFeed);
router.get('/user/:userId', getPostsByUserId);

router.delete('/:id', authMiddleware, deletePost);

module.exports = router;

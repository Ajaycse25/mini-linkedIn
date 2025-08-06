const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = new Post({ userId: req.user.id, content });
    await post.save();

    const populatedPost = await post.populate('userId', 'name');

    res.status(201).json({ post: populatedPost });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ message: 'Something went wrong while creating post' });
  }
};


exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Get feed error:', err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

exports.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await Post.find({ userId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Get posts by user error:', err);
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

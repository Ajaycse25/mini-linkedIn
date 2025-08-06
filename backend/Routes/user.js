const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const posts = await Post.find({ userId: req.user.id });

    res.status(200).json({ user, posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

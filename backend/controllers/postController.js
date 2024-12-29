const Post = require("../models/post");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ updatedAt: -1 })
      .populate("author", "username email firstName lastName")
      .populate("comments.user", "username email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = new Post({ content, author: req.user.id });
    await post.save();
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName email"
    );
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.user._id });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    Object.assign(post, req.body);
    await post.save();
    const updatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName email"
    );
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ message: "Failed to update post", error });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//like a post
exports.likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  console.log(id, userId, req.body)

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      // If not, add userId to the likes array
      post.likes.push(userId);
    }
      
    

    await post.save();
    const updatedPost = await Post.findById(post._id).populate(
      "author",
      "firstName lastName email"
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  const { content } = req.body;
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const post = await Post.findById(req.params.id).populate(
      "comments.user",
      "email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user.id,
      content,
    });

    await post.save();
    const updatedPost = await Post.findById(req.params.id)
      .populate({
        path: "comments.user",
        select: "email",
      })
      .populate({
        path: "author",
        select: "firstName lastName email",
      });

    res
      .status(201)
      .json({ message: "Comment added successfully", updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

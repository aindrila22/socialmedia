const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//current user
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
//user profile
exports.profile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ author: id })
    .sort({ createdAt: -1 })
    .populate("author", "firstName lastName username email")
    .populate("comments.user", "username email");
    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Fetch posts liked by the logged-in user
exports.getMyLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const likedPosts = await Post.find({ likes: id })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json({ likedPosts });
  } catch (error) {
    console.error("Error fetching liked posts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
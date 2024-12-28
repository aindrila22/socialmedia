const express = require('express');
const { register, login, currentUser, profile, getMyLikes } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, currentUser);
router.get('/profile/:id', authMiddleware, profile);
router.get('/profile/:id/likes', authMiddleware, getMyLikes);



module.exports = router;
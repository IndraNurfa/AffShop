const express = require('express');
const router = express.Router();

const {
    thumbnailList,
    getVideoDetails,
    addVideo
} = require('../handler/videoHandler');

const {
    addComment,
    getComments
} = require('../handler/commentHandler');

const {
    registerUser,
    loginUser,
    logoutUser,
} = require('../handler/authHandler')

const { addProduct } = require('../handler/productHandler')

const {
    requireLogin
} = require('../middleware/authMiddleware')

// Home page
router.get('/getThumbnails', thumbnailList);

// Product handler
router.post('/addProduct/:id', requireLogin, addProduct);

// Video handler
router.get('/video/:id', getVideoDetails);
router.post('/addVideo', requireLogin, addVideo);

// Comment handler
router.post('/comment', requireLogin, addComment);
router.get('/comment/:id', getComments);

// User handler
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
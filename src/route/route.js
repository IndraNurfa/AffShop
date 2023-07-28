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
} = require('../handler/authHandler');

const {
    addProduct, getProduct
} = require('../handler/productHandler');

const {
    getProfile,
    editProfile
} = require('../handler/userHandler')

const {
    requireLogin
} = require('../middleware/authMiddleware');

// Home page
router.get('/getThumbnails', thumbnailList);

// Product handler
router.post('/addProduct/:id', requireLogin, addProduct);
router.get('/getProduct/:id', getProduct)

// Video handler
router.get('/video/:id', getVideoDetails);
router.post('/addVideo', requireLogin, addVideo);

// Comment handler
router.post('/comment', requireLogin, addComment);
router.get('/comment/:id', getComments);

// Auth handler
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// User handler
router.get('/profile', requireLogin, getProfile);
router.post('/profile', requireLogin, editProfile);

module.exports = router;
const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controller/authController');
const categoryController = require('../controller/categoryController');
const postController = require('../controller/postController');
const locationController = require('../controller/locationController');
const messageController = require('../controller/messageController');
const chatController = require('../controller/chatController');

// Middleware
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const AuthController = new authController();

router.route('/register')
    .post(AuthController.register);

router.route('/login')
    .post(AuthController.login);

router.route('/categories')
    .get(categoryController.getCategories);

router.route('/posts/:slug')
    .get(postController.getPosts);

//-------------------------------chat routes-----------------------------------
router.route('/getAIResponse')
    .post(chatController.getAIResponse);

router.use(authMiddleware);

router.route('/user/:userId')
    .get(AuthController.getUser);


//-----------------------------------post routes-----------------------------------
router.route('/newpost')
    .post(upload.single('image'), postController.createPost);
router.route('/userposts/:userId')
    .get(postController.getUserPosts);

//-------------------------------location routes-----------------------------------
router.route('/getClinics/:location')
    .get(locationController.getClinics);

//-------------------------------message routes-----------------------------------
router.route('/message/inbox')
    .get(messageController.getInboxUsers);

router.route('/message/:receiver_id')
    .get(messageController.getMessage);





module.exports = router;
const express = require('express');
const router = express.Router();
const {updateUserProfile, getUserProfile} = require('../controllers/UserProfile');
const {auth} = require('../middleware/authMiddleware');

console.log('in routes and moving to controller to create user');
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', auth, updateUserProfile);


module.exports = router;

//
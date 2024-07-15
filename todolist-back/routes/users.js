const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is in models/User.js
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating JWT tokens
const userController = require('../controllers/users.js')

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

module.exports = router;
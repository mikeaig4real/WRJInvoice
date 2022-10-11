// Controllers

const {
    register,
    login,
    updateProfile,
} = require('../controllers/authController');

// Authentication

const {
    auth,
} = require('../middleware/authBearer');

// Router

const router = require('express').Router();

// Register User

router.post('/register', register);

// Login User

router.post('/login', login);

// Update User

router.patch('/updateProfile', auth, updateProfile);



module.exports = router;
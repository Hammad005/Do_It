const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', userController.register);
router.post('/verifyUser', userController.verifyUser);
router.post('/resendOTP', userController.resendOTP);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/me',authMiddleware, userController.getUser);

module.exports = router;
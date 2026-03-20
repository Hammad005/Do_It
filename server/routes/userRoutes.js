const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User routes
router.post('/register', userController.register);
router.post('/verifyUser', userController.verifiyUser);
router.post('/resendOTP', userController.resendOTP);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/sendForgetPasswordOTP', userController.sendForgotPasswordOTP);
router.post('/verifyForgetPasswordOTP', userController.verifiyForgotPasswordOTP);
router.put('/resetPassword', userController.resetPassword);
router.get('/me',authMiddleware, userController.getUser);

module.exports = router;
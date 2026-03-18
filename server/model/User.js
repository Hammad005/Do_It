const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    isVerified: {
=======
    isVerfied: {
>>>>>>> 75aaf55a8a24744a4eeda0500567cfce9da14967
        type: Boolean,
        default: false
    },
    verificationOTP: String,
    verificationOTPExpiry: Date,  
    forgotPasswordOTP: String,
    forgotPasswordOTPExpiry: Date
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;
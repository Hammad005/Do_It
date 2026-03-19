const User = require("../model/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../lib/Nodemailer");
const {
    accountVerificationOtpEmailTemplate,
    forgotPasswordOtpEmailTemplate,
} = require("../utils/emailTemplates");
const otpGenerator = require("../utils/otpGenerator");
const jwtToken = require("../utils/jwtToken");

const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(409).json({ message: "User already exists" });
        } else if (existingUser && !existingUser.isVerified) {
            const OTP = otpGenerator();
            const mailOptions = {
                email,
                subject: "Do It - Account Verification Code",
                text: accountVerificationOtpEmailTemplate(OTP, 5),
            };
            const hashedOTP = await bcrypt.hash(OTP, 10);
            existingUser.verificationOTP = hashedOTP;
            existingUser.verificationOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
            await existingUser.save();
            await sendEmail(mailOptions);
            return res.status(202).json({
                message:
                    "User is not verified yet, check your email for verification code",
                userEmail: existingUser.email,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const OTP = otpGenerator();
        const hashedOTP = await bcrypt.hash(OTP, 10);

        const mailOptions = {
            email,
            subject: "Do It - Account Verification Code",
            text: accountVerificationOtpEmailTemplate(OTP, 5),
        };

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationOTP: hashedOTP,
            verificationOTPExpiry: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        });
        await sendEmail(mailOptions);

        res.status(201).json({
            message:
                "Account created successfully, check your email for verification code",
            userEmail: user.email,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const verifiyUser = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "If account exists, verification code sent" });
        }
        if (user.isVerified) {
            return res.status(409).json({ message: "User is already verified" });
        }
        if (!user.verificationOTPExpiry || user.verificationOTPExpiry < Date.now()) {
            return res.status(400).json({ message: "Verification code has expired" });
        }

        const isMatch = await bcrypt.compare(otp, user.verificationOTP);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        user.isVerified = true;
        user.verificationOTP = null;
        user.verificationOTPExpiry = null;
        await user.save();

        const token = jwtToken(user);
        const removePassword = {...user._doc};
        delete removePassword.password

        res.status(200).json({ message: "User verified successfully", token, user: removePassword });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const resendOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "If account exists, verification code sent" });
        }
        if (user.isVerified) {
            return res.status(409).json({ message: "User is already verified" });
        }
        const now = new Date();
        if (
            user.verificationOTPExpiry &&
            user.verificationOTPExpiry > now - 60 * 1000 // 1 min cooldown
        ) {
            return res.status(429).json({
                message: "Please wait before requesting another OTP",
            });
        }

        const OTP = otpGenerator();
        const mailOptions = {
            email,
            subject: "Do It - Account Verification Code",
            text: accountVerificationOtpEmailTemplate(OTP, 5),
        };
        const hashedOTP = await bcrypt.hash(OTP, 10);

        user.verificationOTP = hashedOTP;
        user.verificationOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        await user.save();
        await sendEmail(mailOptions);
        res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        if (!existingUser.isVerified) {
            const OTP = otpGenerator();
            const mailOptions = {
                email,
                subject: "Do It - Account Verification Code",
                text: accountVerificationOtpEmailTemplate(OTP, 5),
            };
            const hashedOTP = await bcrypt.hash(OTP, 10);
            existingUser.verificationOTP = hashedOTP;
            existingUser.verificationOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
            await existingUser.save();
            await sendEmail(mailOptions);
            return res.status(202).json({
                message:
                    "User is not verified yet, check your email for verification code",
                userEmail: existingUser.email,
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwtToken(existingUser);
        const removePassword = {...existingUser._doc}
        delete removePassword.password

        res.status(200).json({ message: "Login successful", token, user: removePassword });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful", token: null, user: null });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const sendForgotPasswordOTP = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "There is no account with this email" });
        }
        const OTP = otpGenerator();
        const mailOptions = {
            email,
            subject: "Do It - Forget Password Code",
            text: forgotPasswordOtpEmailTemplate(OTP, 5),
        };
        const hashedOTP = await bcrypt.hash(OTP, 10);
        user.forgotPasswordOTP = hashedOTP;
        user.forgotPasswordOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        await user.save();
        await sendEmail(mailOptions);
        res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const verifiyForgotPasswordOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "If account exists, Code sent" });
        }
        if (!user.forgotPasswordOTPExpiry || user.forgotPasswordOTPExpiry < Date.now()) {
            return res.status(400).json({ message: "Code has been expired" });
        }
        const isMatch = await bcrypt.compare(otp, user.forgotPasswordOTP);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid code" });
        }

        user.forgotPasswordOTPVerified = true
        await user.save();
        return res.status(200).json({ message: "Code verified successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    if (!newPassword) {
        return res.status(400).json({ message: "Password is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "There is no account with this email" });
        }
        if (!user.forgotPasswordOTPVerified) {
            return res.status(400).json({ message: "Code has not been verified" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.forgotPasswordOTP = undefined
        user.forgotPasswordOTPExpiry = undefined
        user.forgotPasswordOTPVerified = undefined
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

module.exports = {
    register,
    verifiyUser,
    resendOTP,
    login,
    logout,
    sendForgotPasswordOTP,
    verifiyForgotPasswordOTP,
    resetPassword,
    getUser,
};

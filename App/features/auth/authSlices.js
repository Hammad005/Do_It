import { createSlice } from "@reduxjs/toolkit";
import {login, logoutUser, me, register, resendForgotPasswordCode, resendOTP, resetUserPassword, sendForgotPasswordCode, verifyAccount, verifyForgotPasswordCode} from "./authThunks";


const initialState = {
    user: null,
    userEmail: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    redirectToLogin: false,
    isCheckingAuth: true,
    isVerifying: false,
    isResending: false,
    isResendingForgotPasswordCode: false,
    isforgatting: false,
    isForgattingVerify: false,
    isPasswordReset: false,
    error: null,
    message: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
    },
    extraReducers: (builder) => {

        //Check Auth
        builder.addCase(me.pending, (state, action) => {
            state.isCheckingAuth = true
        })
        .addCase(me.fulfilled, (state, action) => {
            state.isCheckingAuth = false
            state.user = action.payload.user
        })
        .addCase(me.rejected, (state, action) => {
            state.isCheckingAuth = false
            state.error = action.payload
        })

        //Login
        .addCase(login.pending, (state, action) => {
            state.isLoggingIn = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggingIn = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggingIn = false
            state.error = action.payload
        })
        
        //Registeration
        .addCase(register.pending, (state, action) => {
            state.isSigningUp = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isSigningUp = false
            state.message = action.payload.message
        })
        .addCase(register.rejected, (state, action) => {
            state.isSigningUp = false
            state.error = action.payload
        })

        //Verify Account
        .addCase(verifyAccount.pending, (state, action) => {
            state.isVerifying = true
        })
        .addCase(verifyAccount.fulfilled, (state, action) => {
            state.isVerifying = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(verifyAccount.rejected, (state, action) => {
            state.isVerifying = false
            state.error = action.payload
        })

        // Resend Verification OTP
        .addCase(resendOTP.pending, (state, action) => {
            state.isResending = true
        })
        .addCase(resendOTP.fulfilled, (state, action) => {
            state.isResending = false
            state.message = action.payload.message
        })
        .addCase(resendOTP.rejected, (state, action) => {
            state.isResending = false
            state.error = action.payload
        })

        //Forgot Password
        .addCase(sendForgotPasswordCode.pending, (state, action) => {
            state.isforgatting = true
        })
        .addCase(sendForgotPasswordCode.fulfilled, (state, action) => {
            state.isforgatting = false
            state.message = action.payload.message
        })
        .addCase(sendForgotPasswordCode.rejected, (state, action) => {
            state.isforgatting = false
            state.error = action.payload
        })

        //Forgot Password Verification
        .addCase(verifyForgotPasswordCode.pending, (state, action) => {
            state.isForgattingVerify = true
        })
        .addCase(verifyForgotPasswordCode.fulfilled, (state, action) => {
            state.isForgattingVerify = false
            state.message = action.payload.message
        })
        .addCase(verifyForgotPasswordCode.rejected, (state, action) => {
            state.isForgattingVerify = false
            state.error = action.payload
        })

        //Resend Forgot Password Code
        .addCase(resendForgotPasswordCode.pending, (state, action) => {
            state.isResendingForgotPasswordCode = true
        })
        .addCase(resendForgotPasswordCode.fulfilled, (state, action) => {
            state.isResendingForgotPasswordCode = false
            state.message = action.payload.message
        })
        .addCase(resendForgotPasswordCode.rejected, (state, action) => {
            state.isResendingForgotPasswordCode = false
            state.error = action.payload
        })

        //Reset Password
        .addCase(resetUserPassword.pending, (state, action) => {
            state.isPasswordReset = true
        })
        .addCase(resetUserPassword.fulfilled, (state, action) => {
            state.isPasswordReset = false
            state.message = action.payload.message
        })
        .addCase(resetUserPassword.rejected, (state, action) => {
            state.isPasswordReset = false
            state.error = action.payload
        })

        // Logout
        .addCase(logoutUser.pending, (state, action) => {
            state.isLoggingOut = true
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoggingOut = false
            state.user = null
            state.redirectToLogin = true
            state.message = null
            state.error = null
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoggingOut = false
            state.error = action.payload
        })
    }
})

export const { setUser, setUserEmail } = authSlice.actions;

export default authSlice.reducer
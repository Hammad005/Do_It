import { createSlice } from "@reduxjs/toolkit";
import {me, register, verifyAccount} from "./authThunks";


const initialState = {
    user: null,
    userEmail: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isVerifying: false,
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
        
        //Registeration
        .addCase(register.pending, (state, action) => {
            state.isSigningUp = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isSigningUp = false
            state.message = action.payload.message
            state.userEmail = action.payload.userEmail
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
    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


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

    }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, loginUser, logout, registerUser, resendVerificationOTP, resetPassword, sendForgotPasswordOTP, verifyForgetPasswordOTP, verifyUser } from "./authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";


export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            
            const res = await registerUser(data);
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const verifyAccount = createAsyncThunk(
    "auth/verifyAccount",
    async (data, thunkAPI) => {
        try {
            const res = await verifyUser(data);
            await AsyncStorage.setItem("token", res.data.token);
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginUser(data);
            if (res.data.codeSent) {
                Toast.show({ type: "success", text1: res.data.message });
                return res.data;
            }
            await AsyncStorage.setItem("token", res.data.token);
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const resendOTP = createAsyncThunk(
    "auth/resendOTP",
    async (data, thunkAPI) => {
        try {
            const res = await resendVerificationOTP(data);
            
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const sendForgotPasswordCode = createAsyncThunk(
    "auth/sendForgotPasswordCode",
    async (data, thunkAPI) => {
        try {
            const res = await sendForgotPasswordOTP(data);
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data });
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const verifyForgotPasswordCode = createAsyncThunk(
    "auth/verifyForgotPasswordCode",
    async (data, thunkAPI) => {
        try {
            const res = await verifyForgetPasswordOTP(data);
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data });
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const resetUserPassword = createAsyncThunk(
    "auth/resetUserPassword",
    async (data, thunkAPI) => {
        try {
            const res = await resetPassword(data);
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data });
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const res = await logout();
            await AsyncStorage.removeItem("token");
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data });
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

export const me = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {            
            const res = await getUser();
            return res.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
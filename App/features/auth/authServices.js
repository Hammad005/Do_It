import axios from "../../services/axios";

export const registerUser = async (data) => axios.post('/auth/register', data);

export const verifyUser = async (data) => axios.post('/auth/verifyUser', data);

export const loginUser = async (data) => axios.post('/auth/login', data);

export const resendVerificationOTP = async (data) => axios.post('/auth/resendOTP', data);

export const sendForgotPasswordOTP = async (data) => axios.post('/auth/sendForgetPasswordOTP', data);

export const verifyForgetPasswordOTP = async (data) => axios.post('/auth/verifyForgetPasswordOTP', data);

export const resetPassword = async (data) => axios.put('/auth/resetPassword', data);

export const logout = async () => axios.post('/auth/logout');

export const getUser = async () => axios.get('/auth/me');
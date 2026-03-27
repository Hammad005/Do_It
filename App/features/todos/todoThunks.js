import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { createMyTodo, deleteMyTodo, getAllMyTodos, toggleMyTodo, updateMyTodo } from "./todoServices";


export const getTodos = createAsyncThunk(
    "todo/getTodos",
    async (_, thunkAPI) => {
        try {
            const res = await getAllMyTodos();
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const createTodo = createAsyncThunk(
    "todo/createTodo",
    async (data, thunkAPI) => {
        try {
            const res = await createMyTodo(data);
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todo/updateTodo",
    async (data, thunkAPI) => {
        try {
            const res = await updateMyTodo(data.formData, data.id);
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const toggleTodo = createAsyncThunk(
    "todo/toggleTodo",
    async (id, thunkAPI) => {
        try {
            const res = await toggleMyTodo(id);
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (id, thunkAPI) => {
        try {
            const res = await deleteMyTodo(id);
            Toast.show({ type: "success", text1: res.data.message });
            return res.data;
        } catch (error) {
            Toast.show({ type: "error", text1: error.response?.data?.error });
            return thunkAPI.rejectWithValue(error.response?.data?.error);
        }
    }
);
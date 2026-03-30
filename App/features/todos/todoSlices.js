import { createSlice } from "@reduxjs/toolkit";
import {createTodo, deleteTodo, getTodos, toggleTodo, updateTodo} from "./todoThunks";

const initialState = {
    todos: [],
    loading: false,
    error: null,
    message: null,
    isAddingTodo: false,
    isUpdatingTodo: false,
    isDeletingTodo: false,
    isTodoToggling: false
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
    },    
    extraReducers: (builder) => {
        // Fetching all Todos
        builder.addCase(getTodos.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload.todos;
        })
        .addCase(getTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // create Todo
        .addCase(createTodo.pending, (state, action) => {
            state.isAddingTodo = true
        })
        .addCase(createTodo.fulfilled, (state, action) => {
            state.isAddingTodo = false
            state.message = action.payload.message
            state.todos.push(action.payload?.todo)
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.isAddingTodo = false
            state.error = action.payload
        })

        // update Todo
        .addCase(updateTodo.pending, (state, action) => {
            state.isUpdatingTodo = true
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.isUpdatingTodo = false
            state.message = action.payload.message
            state.todos = state.todos.map((todo) => todo._id === action.payload.todo._id ? action.payload.todo : todo)
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.isUpdatingTodo = false
            state.error = action.payload
        })

        // toggle Todo
        .addCase(toggleTodo.pending, (state, action) => {
            state.isTodoToggling = true
        })
        .addCase(toggleTodo.fulfilled, (state, action) => {
            state.isTodoToggling = false
            state.message = action.payload.message
            state.todos = state.todos.map((todo) => todo._id === action.payload.todo._id ? action.payload.todo : todo)
        })
        .addCase(toggleTodo.rejected, (state, action) => {
            state.isTodoToggling = false
            state.error = action.payload
        })

        // delete Todo
        .addCase(deleteTodo.pending, (state, action) => {
            state.isDeletingTodo = true
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.isDeletingTodo = false
            state.message = action.payload.message
            state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.isDeletingTodo = false
            state.error = action.payload
        })
    },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
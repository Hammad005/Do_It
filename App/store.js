import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlices'
import todoReducer from './features/todos/todoSlices'

const Store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer
  },
})

export default Store
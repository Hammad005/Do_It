import axios from "../../services/axios";


export const getAllMyTodos = async () => axios.get('/todo/getTodos');

export const createMyTodo = async (data) => axios.post('/todo/createTodo', data);

export const updateMyTodo = async (data, id) => axios.put(`/todo/updateTodo/${id}`, data);

export const toggleMyTodo = async (id) => axios.put(`/todo/toggleCompletion/${id}`);

export const deleteMyTodo = async ( id) => axios.delete(`/todo/deleteTodo/${id}`);
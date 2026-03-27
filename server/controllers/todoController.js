const Todo = require("../model/Todo");

const createTodo = async (req, res) => {
    const { title, description, date, time } = req.body;
    if (!title || !description || !date || !time) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const todo = await Todo.create({ user: req.user._id, title, description, date, time });
        res.status(200).json({ success: true, todo, message: "Todo created successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user._id}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, todos });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const updateTodo = async (req, res) => {
    const { title, description, date, time } = req.body;
    if (!title || !description || !date || !time) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.time = time;
        await todo.save();
        res.status(200).json({ success: true, todo, message: "Todo updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

const toggleCompletion = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json({ success: true, todo, message: "Todo updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message || "Something went wrong" });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo, toggleCompletion };
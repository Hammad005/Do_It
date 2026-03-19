const express = require('express');
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// Middleware to check if user is authenticated for all todo routes
router.use(authMiddleware);

// Todo routes
router.post('/createTodo', todoController.createTodo);
router.get('/getTodos', todoController.getTodos);
router.put('/updateTodo/:id', todoController.updateTodo);
router.delete('/deleteTodo/:id', todoController.deleteTodo);
router.put('/toggleCompletion/:id', todoController.toggleCompletion);

module.exports = router;
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.use('/api/v1/auth', require('./routes/userRoutes'));
app.use('/api/v1/todo', require('./routes/todoRoute'));

app.use(express.json());

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1', require('./routes/userRoutes'));


connectDB();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
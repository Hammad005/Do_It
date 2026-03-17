const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

connectDB();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
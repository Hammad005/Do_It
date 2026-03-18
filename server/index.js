const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();



const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/v1', require('./routes/userRoutes'));

=======

app.use(express.json());

const PORT = process.env.PORT || 8080;
>>>>>>> 75aaf55a8a24744a4eeda0500567cfce9da14967

connectDB();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
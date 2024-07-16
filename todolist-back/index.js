const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authMiddleware = require('./middlewares/auth.js');

dotenv.config(); // Load environment variables from .env file


const app = express();
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/users')
const todoRoutes = require('./routes/todos');
// Other routes...

// Use routes
app.use('/users', userRoutes);
app.use('/todos', authMiddleware, todoRoutes);
// Other routes...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
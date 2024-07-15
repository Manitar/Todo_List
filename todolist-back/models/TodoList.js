const mongoose = require('mongoose')

// Subschema for a single todo item
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Main todoListSchema with userId and todos array
const todoListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  todos: { type: [todoSchema], default: [] }, // Array of todo items
});

module.exports = mongoose.model('TodoList', todoSchema);

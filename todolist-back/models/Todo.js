const mongoose = require('mongoose')

// Subschema for a single todo item
const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});


module.exports = mongoose.model('Todo', todoSchema);

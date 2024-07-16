// controllers/todoListController.js
const Todo = require('../models/Todo');

async function findTodoById(todoId){
  try{
    const foundTodo = Todo.findOne({_id: todoId})
    return foundTodo
  } catch (err){
    console.error(err)
    throw err
  }
}

function validateTodoBelongsToUser(userId, todo){
  return userId === todo.userId
}

const getAllTodoItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const todos = await Todo.find({userId});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { userId } = req.params
    const { text } = req.body

    const newTodo = await Todo.create({userId, text}) // Completed is automatically false

    await newTodo.save()

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleTodoCompletion = async (req, res) => {
  try { 

    const { userId, todoId } = req.params
    let todo = await findTodoById(todoId)
    if (!todo) {
      res.status(404).json({ error: `Todo with ID: ${todoId} not found` });
    }

    if (!validateTodoBelongsToUser(userId, todo)) {
      res.status(403).json({ error: 'Unauthorized: You can only delete your own todos' });
    }

    todo.completed = !todo.completed
    await todo.save()

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.params

    const todo = await findTodoById(todoId)
    if (!todo) {
      res.status(404).json({ error: `Todo with ID: ${todoId} not found` });
    }
    
    if (!validateTodoBelongsToUser(userId, todo)) {
      res.status(403).json({ error: 'Unauthorized: You can only delete your own todos' });
    }

    await todo.deleteOne();

    res.status(204).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllTodoItemsByUserId,
  createTodo,
  toggleTodoCompletion,
  deleteTodo
  // ... other controller functions
};
// controllers/todoListController.js
const TodoList = require('../models/TodoList');

async function findOrCreateTodoList(userId) {
  try {
    const foundTodoList = await TodoList.findOne({ userId })
    if (!foundTodoList) {
      return await TodoList.create({ userId });
    }
    return foundTodoList
  } catch (err) {
    throw new Error(err)
  }
}

function findTodoById(todoList, todoId) {
  try {
    const todo = TodoList.find(todo => todo._id.toString() === todoId)
    if (!todo) {
      throw new Error(`Todo with todoId ${todoId} not found`);
    }
    return todo
  } catch (err) {
    throw err;
  }
}

const getTodoListByUserId = async (req, res) => {
  try {
    const { userId } = req.params
    const todoLists = await findOrCreateTodoList(userId)
    res.json(todoLists._doc.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { userId } = req.params
    const { text } = req.body

    const todoList = findOrCreateTodoList(userId)

    const newTodo = { text }

    todoList.todos.push(newTodo)
    await todoList.save()

    res.status(201).json(todoList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const completeTodo = async (req, res) => {
  try {
    const { userId, todoId } = req.params
    const { completed } = req.body

    let todoList = findOrCreateTodoList(userId)
    let todo = findTodoById(todoList.todos, todoId)

    todo.completed = completed

    await todoList.save()

    res.status(200).json(todoList.todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { userId, todoListId } = req.params
    let todoList = findOrCreateTodoList(userId)

    const todoIndex = todoList.todos.findIndex(todo => todo._id.toString() === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todoList.todos.splice(todoIndex, 1);
    await todoList.save();

    res.status(204).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getTodoListByUserId,
  createTodo,
  completeTodo,
  deleteTodo
  // ... other controller functions
};
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const todoController = require('../controllers/todos');
const { userExists } = require('../middlewares/validation');

router.get('/:userId', userExists, todoController.getAllTodoItemsByUserId);

router.post('/:userId', userExists, todoController.createTodo);

router.patch('/:userId/:todoId/toggle', userExists, todoController.toggleTodoCompletion);

router.delete('/:userId/:todoId/', userExists, todoController.deleteTodo);

module.exports = router;

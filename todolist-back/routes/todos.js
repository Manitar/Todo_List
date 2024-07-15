const express = require('express');
const router = express.Router();
const todoList = require('../models/TodoList');
const todoController = require('../controllers/todos');
const { userExists } = require('../middlewares/validation');

router.get('/:userId', userExists, todoController.getTodoListByUserId);

router.post('/:userId', userExists, todoController.createTodo);

router.patch('/:userId/:todoId/complete', userExists, todoController.completeTodo);

router.delete('/:userId/:todoId/', userExists, todoController.deleteTodo);

module.exports = router;

const express = require('express');
const router = express.Router();
const TodoController = require('../modules/todo/todo.controller');

router.get('/todos', TodoController.getTodos);
router.post('/todos', TodoController.addTodo);

module.exports = router;
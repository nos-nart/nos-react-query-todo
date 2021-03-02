const express = require('express');
const router = express.Router();
const TodoController = require('../modules/todo/todo.controller');

router.get('/', TodoController.getTodos);
router.post('/new', TodoController.addTodo);
router.delete('/delete', TodoController.removeTodo);
router.patch('/edit', TodoController.updateTodo);

module.exports = router;
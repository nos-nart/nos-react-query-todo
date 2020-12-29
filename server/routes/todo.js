const express = require('express');
const router = express.Router();
const TodoController = require('../modules/todo/todo.controller');

router
  .route('/todos')
  .get(TodoController.getTodos)
  .post(TodoController.addTodo)

module.exports = router;